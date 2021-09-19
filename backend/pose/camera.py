import time
import mediapipe as mp
import cv2
import numpy as np
from datetime import datetime
from django.conf import settings
import os
import math
from tensorflow.keras.models import load_model

from .models import ExerciseSet, Set, ExerciseLog

poseEstimationModel = load_model(
    os.path.join(settings.BASE_DIR, 'pose/my_model.h5'))


class PoseWebCam(object):
    def __init__(self, pk):
        # self.vs = VideoStream(src=0).start()
        self.cap = cv2.VideoCapture(0)
        # self.mpPose = mp.solutions.pose
        self.mpPose = mp.solutions.mediapipe.python.solutions.pose
        self.pose = self.mpPose.Pose()
        self.mpDraw = mp.solutions.mediapipe.python.solutions.drawing_utils
        self.pTime = 0

        self.frame_cnt = 0
        self.allkeypoints = []
        self.outputkeypoints = []

        self.predicted_pose = 'start'

        # 임의의 데이터로 테스트(운동 순서대로 동작 인식하는지 확인)
        self.userExerciseList = {'STANDING SIDE CRUNCH': 7,
                                 'STEP FORWARD DYNAMIC LUNGE': 5, "BURPEE TEST": 6}
        self.keylist = list(self.userExerciseList.keys())  # key만 뽑아서 리스트로 만들기
        self.userexercisename = ''  # 운동 이름 하나를 차례대로 저장하는 변수
        self.exercise_standard_cnt = 0  # 운동 기준 카운트
        self.exercise_user_cnt = 0  # 운동 이름 하나의 개수를 세기위한 변수
        self.tmp_cnt = 0
        self.exercise_user_frame_cnt = 0  # frame_cnt와 구분하기 위한 변수

        self.pose_cnt = 0  # n번 째 포즈

        self.fps = 12  # 본인 환경에서의 fps => 상수값 대신 메소드를 통해 구할 수 있도록 나중에 구현하기
        self.frame_per_second = 3  # 1초 당 추출할 프레임 수


        ### About realtime pose counting
        self.set_id = pk  # set_id
        self.exercise_set = ExerciseSet.objects.filter(set=self.set_id).order_by('set_num')
        self.n = 0 # ExerciseSet n번째
        self.total_count = self.exercise_set[self.n].set_count   # n번째 운동 set_count
        self.current_exercise = self.exercise_set[self.n].exercise.name # n번째 운동 name
        self.exercise_count = 1 # 실시간 수행 횟수
        self.isFinished = False # 한 세트를 끝냈는지

        ### About exerciselog
        self.user_id = 1    # user_id
        self.isAdded = False    # ExerciseLog 객체 한 번만 생성
        self.logs = []    # ExerciseLog id 배열

        """
        # mediapipe 키포인트 33개 중에서내 사용될 12개의 키포인트
        self.skeleton = {'Right Shoulder': 12, 'Right Elbow': 14, 'Right Wrist': 16, 'Left Shoulder': 11, 'Left Elbow': 13,
                            'Left Wrist': 15, 'Right Hip': 24, 'Right Knee': 26, 'Right Ankle': 28, 'Left Hip': 23,
                            'Left Knee': 25, 'Left Ankle': 27}
        """

    def __del__(self):
        cv2.destroyAllWindows()

    def get_frame(self):

        success, img = self.cap.read()

        # print("read frame")

        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = self.pose.process(imgRGB)
        # print(results.pose_landmarks.landmark[0])

        keypoints = []  # 1프레임의 keypoints를 담은 배열
        # keypoints.add([results.pose_landmarks.landmark[0]])

        # 세트 목록 순서대로 정렬
        self.exercise_set = sorted(
            self.exercise_set, key=lambda exercise_set: exercise_set.set_num)
        ## print("self.exercise_set_id_s:", self.exercise_set[0].id, self.exercise_set[1].id)

        # 사용자가 만든 운동 세트에 있는 운동 이름 하나 가져오기
        if len(self.keylist) > self.tmp_cnt:
            self.userexercisename = self.keylist[self.tmp_cnt]
            self.exercise_standard_cnt = self.userExerciseList[self.userexercisename]

        if results.pose_landmarks:
            ### About exerciselog
            if (self.isAdded == False):
                for exercise in self.exercise_set:
                    ### ExerciseLog 객체 생성
                    log = ExerciseLog(user_id=self.user_id, set_id=self.set_id, set_exercise_id=exercise.id, correct_count=0, fail_count=0, time_started=datetime.now())
                    log.save()
                    self.logs.append(log.id)
                self.isAdded = True # 1번 만

            for id, lm in enumerate(results.pose_landmarks.landmark):
                self.mpDraw.draw_landmarks(
                    img, results.pose_landmarks, self.mpPose.POSE_CONNECTIONS)
                h, w, c = img.shape

                cx, cy = int(lm.x * w), int(lm.y * h)
                cv2.circle(img, (cx, cy), 5, (255, 0, 0), cv2.FILLED)

            # print(results.pose_landmarks.landmark[0])

            self.frame_cnt += 1  # frame_cnt 번째 프레임 - 관절값이 인식된 프레임들
            interval = int(self.fps) // self.frame_per_second  # 프레임 간격(0.x초)

            if self.frame_cnt % interval == 0:  # 1초에 3 프레임 씩

                self.exercise_user_frame_cnt += 1

                # 프레임 순서 출력
                frame_order = (self.frame_cnt // interval) % 16
                if frame_order == 0:
                    frame_order = 16

                ### About pose counting
                if frame_order == 1 and not self.isFinished:
                    print("<<", self.current_exercise, ": ",self.exercise_count,"/", self.total_count, "회 >>")

                print(frame_order, "th frame")

                for id, lm in enumerate(results.pose_landmarks.landmark):
                    h, w, c = img.shape
                    cx, cy = int(lm.x*w), int(lm.y*h)

                    # 1프레임에 33개의 keypoints값 차례로 넣어줌.
                    keypoints.append((cx, cy))

                # if self.frame_cnt < 17 : # 나머지 이용
                # self.allkeypoints.append(keypoints) # 프레임별 keypoints가 모두 있는 배열
                # input을 계산하는데 필요한 12 points만 append 함
                self.allkeypoints.append(keypoints)

                if len(self.allkeypoints) == 16:  # 배열의 길이는 항상 16개를 유지

                    self.pose_cnt += 1

                    # self.outputkeypoints=[self.allkeypoints]  # 단지, 3차원 배열로 만들어주기 위함(이전까지는 2차원 배열)
                    #                                             (수정) => get_input()에서 3차원으로 입력층을 생성
                    self.outputkeypoints = self.allkeypoints
                    # self.get_keypoints() # 프레임 수가 16개가 되면, 16개의 프레임에 대한 keypoints가 모여있는 배열 반환해주는 함수

                    self.predicted_pose = self.detect_and_predict_pose()  # 예측된 포즈(라벨)
                    print(self.pose_cnt, "th pose is", self.predicted_pose)
                    # 예측된 포즈(라벨) 출력
                    cv2.putText(img, self.predicted_pose, (50, 50),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)

                    if self.exercise_user_frame_cnt == 16:
                        self.exercise_user_cnt += 1
                        self.exercise_user_frame_cnt = 0

                    print("-----------------------------")
                    print(self.userexercisename)
                    print(self.exercise_standard_cnt)
                    print(self.exercise_user_cnt)
                    if self.userexercisename == self.predicted_pose:
                        print("success!")
                    else:
                        print("fail")
                    print("-----------------------------")

                    if self.exercise_standard_cnt == self.exercise_user_cnt:
                        self.tmp_cnt += 1
                        self.exercise_user_cnt = 0

                    frame_flip = cv2.flip(img, 1)
                    ret, jpeg = cv2.imencode('.jpg', frame_flip)

                    self.allkeypoints = []  # 배열 초기화

                    ### About pose counting
                    if (self.isFinished == False):
                        if self.exercise_count % self.total_count == 0:
                            ### About exerciselog
                            current_log = ExerciseLog.objects.get(id=self.logs[self.n])
                            current_log.time_finished = datetime.now() # time_finished 필드 값 추가
                            current_log.save()

                            self.exercise_count = 0
                            self.n += 1

                            if ( len(self.exercise_set) <= self.n ):
                                self.isFinished = True
                            else:
                                self.total_count = self.exercise_set[self.n].set_count
                                self.current_exercise = self.exercise_set[self.n].exercise.name

                        if ( self.n < len(self.exercise_set) ):
                            self.exercise_count += 1
                            ### About exerciselog
                            current_log = ExerciseLog.objects.get(id=self.logs[self.n])
                            current_log.correct_count = self.exercise_count # counting
                            current_log.save()
                            print("id || exercise_count: ", current_log.id, current_log.correct_count)


                #if (self.exercise_count != 0):
                #    print("count ...",self.exercise_count,"/", self.total_count)

                # 제대로 만들었는지 확인하기 위한 print문 (cmd창 참고)
                # print(self.frame_cnt)
                # print(len(self.allkeypoints))

                # print(len(self.allkeypoints[0]))

                # print(self.allkeypoints)


        # cTime = time.time()
        # self.fps = 1/(cTime-self.pTime)

        # self.pTime = cTime

        # cv2.putText(img, str(int(self.fps)), (50,50), cv2.FONT_HERSHEY_SIMPLEX,1,(255,0,0), 3)

        # cv2.putText(img, self.predicted_pose, (50, 50),
        # cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)

        # if(self.exercise_count != 0) and (self.isFinished == False):
        #     cv2.putText(img, str(int(self.fps)), (50,50), cv2.FONT_HERSHEY_SIMPLEX,1,(255,0,0), 3)

        # cv2.imshow("Image", img)
        # cv2.waitKey(1)

        frame_flip = cv2.flip(img, 1)
        ret, jpeg = cv2.imencode('.jpg', frame_flip)

        return jpeg.tobytes()

    # 16개의 프레임에서 keypoints를 모두 모아서 반환해주는 함수 (3차원 배열 형태) -> ## 2차원으로 수정
    def get_keypoints(self):
        #print("get_keypoints 호출!")
        # print(self.outputkeypoints)
        return self.outputkeypoints

    # 예측 값에 해당하는 라벨(한글) 반환하는 함수
    def detect_and_predict_pose(self):
        """
        poses = { 0: "스탠딩 사이드 크런치",
                    1: "스탠딩 니업",
                    2: "버피 테스트",
                    3: "스텝 포워드 다이나믹 런지",
                    4: "스텝 백워드 다이나믹 런지",
                    5: "사이드 런지",
                    6: "크로스 런지",
                    7: "굿모닝"
                  }
        """

        poses = {0: "STANDING SIDE CRUNCH",
                 1: "STANDING KNEE UP",
                 2: "BURPEE TEST",
                 3: "STEP FORWARD DYNAMIC LUNGE",
                 4: "STEP BACKWARD DYNAMIC LUNGE",
                 5: "SIDE LUNGE",
                 6: "CROSS LUNGE",
                 7: "GOODMORNING"
                 }
        inputs = np.array(self.get_input(), dtype="float32")
        preds = poseEstimationModel.predict(inputs, batch_size=32)
        label = poses[np.argmax(preds)]

        return label

    # 1개 프레임의 관절값에 대해 angle, ratio, vertical, ratioavg 계산하는 함수
    def calc_one_frame(self, points):
        # 각도를 재는 부위 : 각도를 재는데 필요한 부위 3개 -> mediapipe 키포인트에 맞춰서 수정
        ANGLE_PAIR = {
            "leftArmpit": [11, 13, 23],
            "rightArmpit": [12, 14, 24],
            'LeftShoulder': [11, 12, 23],
            'RightShoulder': [12, 11, 24],
            'leftElbow': [13, 11, 15],
            'rightElbow': [14, 12, 16],
            'leftHip': [23, 24, 11],
            'RightHip': [24, 23, 12],
            'leftGroin': [23, 25, 27],
            'rightGroin': [24, 26, 28],
            'leftKnee': [25, 27, 23],
            'rightKnee': [26, 28, 24]
        }

        # Angle
        parts = []
        for pair1 in ANGLE_PAIR:  # 각도 계산하는 부위

            slope = 0  # slope 초기화

            partA = ANGLE_PAIR[pair1][0]  # 각도를 계산하는데 필요한 부위 1
            partB = ANGLE_PAIR[pair1][1]  # 각도를 계산하는데 필요한 부위 2
            partC = ANGLE_PAIR[pair1][2]  # 각도를 계산하는데 필요한 부위 3
            if points[partA] and points[partB] and points[partC]:
                line_1_2 = math.sqrt(
                    math.pow(points[partA][0] - points[partB][0], 2) + math.pow(points[partA][1] - points[partB][1], 2))
                line_1_3 = math.sqrt(
                    math.pow(points[partA][0] - points[partC][0], 2) + math.pow(points[partA][1] - points[partC][1], 2))
                line_2_3 = math.sqrt(
                    math.pow(points[partB][0] - points[partC][0], 2) + math.pow(points[partB][1] - points[partC][1], 2))

                try:
                    radians = math.acos(
                        (math.pow(line_1_2, 2) + math.pow(line_1_3, 2) - math.pow(line_2_3, 2)) / (
                            2 * line_1_2 * line_1_3))
                except ZeroDivisionError as e:
                    radians = 0
                parts.append((radians * 180) / math.pi)
            else:
                parts.append(0)

        # Slope
        hipSlope = 0
        shoulderSlope = 0

        # openpose skeleton 인덱스 에서 mediapipe skeleton 인덱스로 바꿈
        part_5 = self.change_part(5)
        part_11 = self.change_part(11)
        part_12 = self.change_part(12)
        part_2 = self.change_part(2)
        part_8 = self.change_part(8)
        part_9 = self.change_part(9)

        if points[part_2][0] - points[part_9][0] == 0 or points[part_8][0] - points[part_9][0] == 0:
            slope = -9999
        else:
            shoulderSlope = abs((
                (points[part_2][1] - points[part_9][1]) /
                (points[part_2][0] - points[part_9][0])
            ))
            hipSlope = abs((
                (points[part_8][1] - points[part_9][1]) /
                (points[part_8][0] - points[part_9][0])
            ))

        slope = min(shoulderSlope, hipSlope)

        # Vertical
        if math.atan(slope) > 0.87:
            verticalPose = 1000
        else:
            verticalPose = -1000

        # ratioAvg
        leftTop = math.sqrt(
            math.pow(points[part_5][0] - points[part_11][0], 2) + math.pow(points[part_5][1] - points[part_11][1], 2))

        leftBottom = math.sqrt(
            math.pow(points[part_11][0] - points[part_12][0], 2) + math.pow(points[part_11][1] - points[part_12][1], 2))

        rightTop = math.sqrt(
            math.pow(points[part_2][0] - points[part_8][0], 2) + math.pow(points[part_2][1] - points[part_8][1], 2))

        rightBottom = math.sqrt(
            math.pow(points[part_8][0] - points[part_9][0], 2) + math.pow(points[part_8][1] - points[part_9][1], 2))

        ratioAvg = (leftTop / leftBottom + rightTop / rightBottom) / 2

        parts.append(slope)
        parts.append(verticalPose)
        parts.append(ratioAvg)

        return parts

    # 하나의 입력층 반환하는 함수
    def get_input(self):
        inputs = []
        for one_frame in self.get_keypoints():
            inputs.append(self.calc_one_frame(one_frame))
        return [inputs]

    # openpose skeleton 인덱스 에서 mediapipe skeleton 인덱스로 바꾸는 함수(기존 계산 코드를 편리하게 적용하기 위함)
    def change_part(self, openpose_index):
        skeleton_dic = {2: 12, 3: 14, 4: 16, 5: 11, 6: 13,
                        7: 15, 8: 24, 9: 26, 10: 28, 11: 23, 12: 25, 13: 27}
        return skeleton_dic[openpose_index]

    # def print_exercise_count(self):

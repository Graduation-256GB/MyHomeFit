import time
import mediapipe as mp
import cv2
import numpy as np
from datetime import datetime, date, timezone, timedelta
from django.utils.dateformat import DateFormat
from django.conf import settings
import os
import math
from tensorflow.keras.models import load_model
import time

from .models import ExerciseSet, Set, ExerciseLog

poseEstimationModel = load_model(
    os.path.join(settings.BASE_DIR, 'pose/my_model.h5'))


class PoseWebCam(object):
    def __init__(self, pk, num):
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

        #self.predicted_pose = 'start'
        self.predicted_pose_list = []

        # About realtime pose counting
        self.set_id = pk  # set_id
        self.exercise_set = ExerciseSet.objects.filter(
            set=self.set_id).order_by('set_num')
        self.exercise_log = []
        self.n = 0  # ExerciseSet n번째
        # n번째 운동 set_count
        self.total_count = self.exercise_set[self.n].set_count
        # n번째 운동 name
        self.current_exercise = self.exercise_set[self.n].exercise.name
        self.exercise_count = 1  # 실시간 수행 횟수
        self.isFinished = False  # 한 세트를 끝냈는지

        # About exerciselog
        # self.user_id = 1    # user_id
        self.isAdded = False    # ExerciseLog 객체 한 번만 생성
        self.logs = []    # ExerciseLog id 배열

        self.successOrFail = 'Checking.....'

        print(self.exercise_set)

        self.pose_cnt = 0  # n번 째 포즈

        self.fps = 14  # 본인 환경에서의 fps => 상수값 대신 메소드를 통해 구할 수 있도록 나중에 구현하기
        self.frame_per_second = int(num)  # 1초 당 추출할 프레임 수
        self.time_count = 16/self.frame_per_second

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

        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = self.pose.process(imgRGB)
        # print('time_count', math.floor(self.time_count))
        keypoints = []  # 1프레임의 keypoints를 담은 배열
        if results.pose_landmarks:
            # About exerciselog
            if (self.isAdded == False):
                for exercise in self.exercise_set:
                    log = ExerciseLog.objects.filter(
                        set_exercise_id=exercise.id).last()
                    self.exercise_log.append(log)
                    self.logs.append(log.id)
                self.isAdded = True  # 1번 만
                print("self.exercise_log: ", self.exercise_log)

            # Success Fail 화면에 표시
            # cv2.putText(img, self.successOrFail, (200, 200),
            #            cv2.FONT_HERSHEY_SIMPLEX, 3, (255, 0, 0), 3)

            for id, lm in enumerate(results.pose_landmarks.landmark):
                self.mpDraw.draw_landmarks(
                    img, results.pose_landmarks, self.mpPose.POSE_CONNECTIONS)
                h, w, c = img.shape

                cx, cy = int(lm.x * w), int(lm.y * h)
                cv2.circle(img, (cx, cy), 5, (255, 0, 0), cv2.FILLED)

            # print(results.pose_landmarks.landmark[0])

            self.frame_cnt += 1  # frame_cnt 번째 프레임 - 관절값이 인식된 프레임들
            interval = int(self.fps) // self.frame_per_second  # 프레임 간격(0.x초)
            cv2.putText(img, str(math.floor(self.time_count)), (1111, 80),
                        cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 3)

            if self.frame_cnt % interval == 0:  # 1초에 3 프레임 씩

                # self.exercise_user_frame_cnt += 1

                # 프레임 순서 출력
                frame_order = (self.frame_cnt // interval) % 16
                if frame_order == 0:
                    frame_order = 16

                # if(self.pose_cnt+1 > self.total_count):
                #    return

                # About pose counting
                if frame_order == 1 and not self.isFinished:
                    print((self.exercise_set[self.n]).set_num, "번째 운동")
                    print("<<", self.current_exercise, ": ",
                          self.exercise_count, "/", self.total_count, "회 >>")
                    self.time_count = 16/self.frame_per_second

                print(frame_order, "th frame")
                # cv2.putText(img, str(math.floor(self.time_count)), (1200, 80),
                #             cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 3)
                print("time_count: ", math.floor(self.time_count))
                if frame_order % self.frame_per_second == 0 and frame_order != 15:
                    self.time_count -= 1

                for id, lm in enumerate(results.pose_landmarks.landmark):
                    h, w, c = img.shape
                    cx, cy = int(lm.x*w), int(lm.y*h)

                    # 1프레임에 33개의 keypoints값 차례로 넣어줌.
                    keypoints.append((cx, cy))

                self.allkeypoints.append(keypoints)

                if len(self.allkeypoints) == 16:  # 배열의 길이는 항상 16개를 유지

                    self.pose_cnt += 1

                    # self.outputkeypoints=[self.allkeypoints]  # 단지, 3차원 배열로 만들어주기 위함(이전까지는 2차원 배열)
                    #                                             (수정) => get_input()에서 3차원으로 입력층을 생성
                    self.outputkeypoints = self.allkeypoints
                    # self.get_keypoints() # 프레임 수가 16개가 되면, 16개의 프레임에 대한 keypoints가 모여있는 배열 반환해주는 함수

                    # self.predicted_pose = self.detect_and_predict_pose()  # 예측된 포즈(라벨)
                    #print(self.pose_cnt, "th pose is", self.predicted_pose)
                    self.predicted_pose_list = self.detect_and_predict_pose()
                    print(self.pose_cnt, "th pose is",
                          self.predicted_pose_list)
                    # # 예측된 포즈(라벨) 출력

                    # if self.predicted_pose == self.current_exercise:
                    if self.current_exercise in self.predicted_pose_list:  # 확률이 높은 4개 중 하나라도 속하면 Success
                        self.successOrFail = 'Success'
                    else:
                        self.successOrFail = 'Fail'

                    # About pose counting
                    if (self.isFinished == False):
                        # About exerciselog
                        current_log = ExerciseLog.objects.get(
                            id=self.logs[self.n])
                        # counting
                        if (self.successOrFail == 'Fail'):
                            current_log.fail_count = current_log.fail_count + 1
                        else:
                            current_log.correct_count = current_log.correct_count + 1
                        current_log.save()

                        if self.exercise_count % self.total_count == 0:
                            # About exerciselog
                            current_log = ExerciseLog.objects.get(
                                id=self.logs[self.n])
                            KST = timezone(timedelta(hours=9))
                            current_log.time_finished = datetime.now(
                                KST)  # time_finished 필드 값 추가
                            #current_log.time_finished = DateFormat(datetime.now()).format('Y-m-d h:m:s')
                            current_log.save()
                            print("time_finished 생성: ",
                                  current_log.time_finished)

                            self.exercise_count = 0
                            self.n += 1

                            if (len(self.exercise_set) <= self.n):
                                self.isFinished = True
                            else:
                                self.total_count = self.exercise_set[self.n].set_count
                                self.current_exercise = self.exercise_set[self.n].exercise.name

                        if (self.n < len(self.exercise_set)):
                            self.exercise_count += 1

                    frame_flip = cv2.flip(img, 1)
                    ret, jpeg = cv2.imencode('.jpg', frame_flip)

                    self.allkeypoints = []  # 배열 초기화

        frame_flip = cv2.flip(img, 1)
        ret, jpeg = cv2.imencode('.jpg', frame_flip)

        return jpeg.tobytes()

    # 16개의 프레임에서 keypoints를 모두 모아서 반환해주는 함수 (3차원 배열 형태) -> ## 2차원으로 수정
    def get_keypoints(self):
        return self.outputkeypoints

    # 예측 값에 해당하는 라벨(한글) 반환하는 함수
    def detect_and_predict_pose(self):

        poses = {0: "스탠딩 사이드 크런치",
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
        """
        # 확률이 높은 4개의 list를 label로 return
        label = []
        inputs = np.array(self.get_input(), dtype="float32")
        preds = poseEstimationModel.predict(inputs, batch_size=32)
        preds_listed = list(preds[0])
        preds_sorted = np.sort(preds, axis=1)
        preds_sorted = list(preds_sorted[0][-5:])  # 확률이 가장 높은 4개
        for e in preds_sorted:
            label.append(poses[preds_listed.index(e)])
        #label = poses[np.argmax(preds)]

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

    # def countdown(self, num_of_secs):
    #     print('count')
    #     while num_of_secs:
    #         m, s = divmod(num_of_secs, 60)
    #         min_sec_format = '{:02d}:{:02d}'.format(m, s)
    #         print(min_sec_format, end='/r')
    #         time.sleep(1)
    #         num_of_secs -= 1

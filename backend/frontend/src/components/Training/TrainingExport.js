import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier'
import React, { useRef } from 'react';
import Webcam from "react-webcam";

function App() {
    const camera = useRef();
    const figures = useRef();

    const btnA = useRef();
    const btnB = useRef();
    const btnC = useRef();
    const btnExport = useRef();

    let net;
    /**
     * @type {knnClassifier}
     */
    const classifier = knnClassifier.create();
    const webcamElement = camera.current;
    console.log('Loading mobilenet..');


    const run = async () => {
        net = await mobilenet.load();
        const webcam = await tf.data.webcam(webcamElement, {
            resizeHeight: 534,
            resizeWidth: 870
        });
        const addExample = async classId => {
            // Capture an image from the web camera.
            const img = await webcam.capture();

            // Get the intermediate activation of MobileNet 'conv_preds' and pass that
            // to the KNN classifier.
            const activation = net.infer(img, true);

            // Pass the intermediate activation to the classifier.
            classifier.addExample(activation, classId);

            // Dispose the tensor to release the memory.
            img.dispose();
        };
        const exportProc = () => {

            let dataset = classifier.getClassifierDataset()
            var datasetObj = {}
            Object.keys(dataset).forEach((key) => {
                let data = dataset[key].dataSync();
                // use Array.from() so when JSON.stringify() it covert to an array string e.g [0.1,-0.2...]
                // instead of object e.g {0:"0.1", 1:"-0.2"...}
                datasetObj[key] = Array.from(data);
            });
            let jsonStr = JSON.stringify(datasetObj)
            //can be change to other source
            localStorage.setItem("myData", jsonStr);
        }

        btnA.current.addEventListener('click', () => addExample('cup'));
        btnB.current.addEventListener('click', () => addExample('bottle'));
        btnC.current.addEventListener('click', () => addExample('phone'));
        btnExport.current.addEventListener('click', () => exportProc());

        while (true) {
            if (classifier.getNumClasses() > 0) {
                const img = await webcam.capture();
                // Get the activation from mobilenet from the webcam.
                const activation = net.infer(img, 'conv_preds');
                // Get the most likely class and confidence from the classifier module.
                const result = await classifier.predictClass(activation);

                //const result = await net.classify(img);

                if (figures.current) {
                    //const classes = ['A', 'B', 'C'];
                    figures.current.innerText = `
        prediction: ${result.label} \n
        probability: ${result.confidences[result.label]}
        `;
                    //figures.current.innerText = `Prediction: ${ result[0].className } \n probability: ${ result[0].probability } `;
                }
                img.dispose();
            }
            await tf.nextFrame();
        }
    };
    React.useEffect(() => {
        if (camera.current) { run(); }
    }, [camera]);

    return (
        <div className="App">

            <div ref={figures}></div>

            {/* <img ref={refImg} crossorigin src="https://i.imgur.com/JlUvsxa.jpg" width="227" height="227" /> */}

            <Webcam />

            <webcam autoPlay playsInline muted={true}
                    ref={camera}
                    width="870" height="534"></webcam>

            <div>
                <button ref={btnA}> add cup</button>
                <button ref={btnB}> add Bottle</button>
                <button ref={btnC}> add phone</button>
            </div>
            <div>
                export..
                <button ref={btnExport}> export</button>
            </div>
        </div>
    );
}

export default App;
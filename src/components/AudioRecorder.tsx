import React from "react";
import PredictionService from "../service/PredictionService";
import IconWaveform from "./icons/IconWaveform";

export default class AudioRecorder extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {api: new PredictionService()}
    }


    onClick() {
        let chunks: any = [];
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia(
                    {
                        audio: true,
                    }
                ).then((stream) => {
                const options = {
                    audioBitsPerSecond: 128000,
                    mimeType: "audio/webm;codecs=opus",
                };
                const mediaRecorder = new MediaRecorder(stream, options);
                mediaRecorder.start(1000);
                setTimeout(() => {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                    console.log("recorder stopped");
                }, 6000);

                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                    console.log(mediaRecorder.state);
                }

                mediaRecorder.onstop = () => {
                    console.log("recorder stopped", chunks);
                    const clipContainer = document.createElement("article");
                    // const a = document.createElement('a');
                    const audio = document.createElement("audio");

                    clipContainer.classList.add("clip");
                    audio.setAttribute("controls", "");
                    document.body.appendChild(clipContainer);
                    clipContainer.appendChild(audio);
                    // const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});
                    const blob = new Blob(chunks, {type: "audio/wav"});
                    const service = new PredictionService();
                    chunks = [];
                    const file = new File([blob], "recording", {type: "audio/ogg"});
                    const formData = new FormData();
                    formData.append("stream", file, 'testfilename');
                    service.predict(formData).then((e) => {
                        console.log('axios: ', e);
                    })
                    // console.log(file);
                    const audioURL = window.URL.createObjectURL(blob);
                    console.log('AUDIO URL: ', audioURL);
                    // a.href = audioURL;
                    // a.download = 'malakas.wav';
                    audio.src = audioURL;
                    // setTimeout(() => a.click(), 2000);
                }
            })

        }
    }

    render() {
        return (
            <button className="sound-button pulsate-bck" onClick={this.onClick}>
                <IconWaveform/>
            </button>
        )
    }
}


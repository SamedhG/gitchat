import { useRef, useEffect} from 'react'

const audioCtx = new AudioContext(); 
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 32;     

export default function Visualizer({mediaStream}) {
    const analyserCanvas = useRef(null);
    let data = new Uint8Array(analyser.frequencyBinCount)
    const audioSrc = audioCtx.createMediaStreamSource(mediaStream);



    const draw = (ctx) => {
        if (!analyserCanvas.current) return;
        ctx.clearRect(0, 0, analyserCanvas.current.width, analyserCanvas.current.height)
        let dataParm = [...data];             
        ctx.fillStyle = 'white';  //white background          
        ctx.lineWidth = 4; //width of candle/bar
        ctx.strokeStyle = '#d5d4d5'; //color of candle/bar
        const space = analyserCanvas.current.width / dataParm.length;
        dataParm.forEach((value, i) => {
            ctx.beginPath();
            ctx.moveTo(space * i, analyserCanvas.current.height); //x,y
            ctx.lineTo(space * i, analyserCanvas.current.height - (value * analyserCanvas.current.height / 256)); //x,y
            ctx.stroke();
        });         
    };

    const loopingFunction = (ctx) => {
        requestAnimationFrame(() => loopingFunction( ctx));
        analyser.getByteFrequencyData(data);
        draw(ctx);
    };

    useEffect(() => {
        audioSrc.connect(analyser);
        if (analyserCanvas.current) {
            const ctx = analyserCanvas.current.getContext('2d');
            analyserCanvas.current.width = 100
            analyserCanvas.current.height = 50
            loopingFunction(ctx); 
        }
    })


    return(
        <canvas ref={analyserCanvas}></canvas>
    );
}

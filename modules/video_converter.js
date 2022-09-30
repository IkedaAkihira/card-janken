/**
 * 
 * @param {HTMLVideoElement} video 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @returns 
 */
 export function getImageDataFromVideo(video,x,y,width,height){
    const canvas=document.createElement('canvas');
    canvas.height=video.videoHeight;
    canvas.width=video.videoWidth;

    const ctx=canvas.getContext('2d');

    ctx.drawImage(video,0,0);

    const imageData=ctx.getImageData(x,y,width,height);

    return imageData;
}

/**
 * @param {ImageData} imageData
 * @return {number}
 */
export function getCardId(imageData){
    
    const code=jsQR(
        imageData.data,
        imageData.width,
        imageData.height,
        {inversionAttempts:'dontInvert'}
    );
    if(!code)
        return NaN;
    return parseInt(
        code.data
    );
}
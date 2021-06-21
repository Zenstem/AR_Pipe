const unityInstance = UnityLoader.instantiate("unityContainer", "Build/MoonJi.json");
let isCameraReady = false;
let gl = null;

function cameraReady(){
    isCameraReady = true;
    gl = unityInstance.Module.ctx;
}

AFRAME.registerComponent('cameratransform', {
    tock: function(time, timeDelta){
        const projection = this.el.components.camera.camera.projectionMatrix.clone();
        const serializedProj = `${[...projection.elements]}`

        if(isCameraReady){
            unityInstance.SendMessage("Main Camera", "setProjection", serializedProj);
        }

        if(gl != null){
            gl.dontClearOnFrameStart = true;
        }
    } 
});

AFRAME.registerComponent('copycanvas', {
	tick: function(time, timeDelta){
		const unityCanvas = document.getElementsByTagName('canvas')[0];
        if (window.ScreenModify != undefined)
        {
		    unityCanvas.style.margin = window.ScreenModify.top + "px 0px 0px " + window.ScreenModify.left + "px";
		    unityCanvas.width = this.el.canvas.width + (window.ScreenModify.width - this.el.canvas.width);
		    unityCanvas.height = this.el.canvas.height + (window.ScreenModify.height - this.el.canvas.height);
        }
        else
        {
            unityCanvas.width = this.el.canvas.width
            unityCanvas.height = this.el.canvas.height
        }
	} 
});

//AFRAME.registerComponent('copycanvas', {
//    tick: function(time, timeDelta){
//        const unityCanvas = document.getElementsByTagName('canvas')[0];
//        unityCanvas.width = this.el.canvas.width
//        unityCanvas.height = this.el.canvas.height
//    } 
//});

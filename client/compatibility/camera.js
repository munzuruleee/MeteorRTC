var CameraService = function(localVideoElement){
	var preview = localVideoElement;
	var localStream;
	var mediaConfig = {
        audio:true,
        video: {
        	mandatory: {},
        	optional: []
        }
    };

	return {
		start: function(){
			return requestUserMedia(mediaConfig)
			.then(function(stream){	
				attachMediaStream(preview, stream);
				localStream = stream;
			})
			.catch(Error('Failed to get access to local media.'));
		},
		stop: function(){
			return new Promise(function(resolve, reject){			
				try {
					localStream.stop();
					preview.src = '';
					resolve();
				} catch(error) {
					reject(error);
				}
    		});
		}	
	}
};
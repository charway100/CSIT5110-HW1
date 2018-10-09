// This object represent the waveform generator
var WaveformGenerator = {
    // The generateWaveform function takes 4 parameters:
    //     - type, the type of waveform to be generated
    //     - frequency, the frequency of the waveform to be generated
    //     - amp, the maximum amplitude of the waveform to be generated
    //     - duration, the length (in seconds) of the waveform to be generated
    generateWaveform: function(type, frequency, amp, duration) {
        var nyquistFrequency = sampleRate / 2; // Nyquist frequency
        var totalSamples = Math.floor(sampleRate * duration); // Number of samples to generate
        var result = []; // The temporary array for storing the generated samples

        switch(type) {
            case "sine-time": // Sine wave, time domain
                for (var i = 0; i < totalSamples; ++i) {
                    var currentTime = i / sampleRate;
                    result.push(amp * Math.sin(2.0 * Math.PI * frequency * currentTime));
                }
                break;
            case "clarinet-additive":
                /**
                * TODO: Complete this function
                **/

                var harmonics = [1,0.75,0.5,0.14,0.5,0.12,0.17];
                for (var i = 0; i < totalSamples; ++i) {
                    var currentTime = i / sampleRate;
                    var sampleValue = 0;

                    // TODO: Super-positioning the harmonic sine waves, until the nyquist frequency is reached
                    for (var j = 0; j < harmonics.length; ++j) {
                        if ((2*j+1)*frequency >= nyquistFrequency) 
                            {
                                console.log("nyquistFrequency reached")
                                break;
                            }
                        sampleValue += harmonics[j] * Math.sin(2.0 * Math.PI * (2*j+1) * frequency * currentTime);
                    }
                    result.push(amp * sampleValue);
                }
                break;
            case "fm": // FM
                /**
                * TODO: Complete this function
                **/

                // Obtain all the required parameters
                var carrierFrequency = parseInt($("#fm-carrier-frequency").val());
                var carrierAmplitude = parseFloat($("#fm-carrier-amplitude").val());
                var modulationFrequency = parseInt($("#fm-modulation-frequency").val());
                var modulationAmplitude = parseFloat($("#fm-modulation-amplitude").val());
                var useADSR = $("#fm-use-adsr").prop("checked");
                if(useADSR) { // Obtain the ADSR parameters
                    var attackDuration = parseFloat($("#fm-adsr-attack-duration").val()) * sampleRate;
                    var decayDuration = parseFloat($("#fm-adsr-decay-duration").val()) * sampleRate;
                    var releaseDuration = parseFloat($("#fm-adsr-release-duration").val()) * sampleRate;
                    var sustainLevel = parseFloat($("#fm-adsr-sustain-level").val()) / 100.0;
                }

                for(var i = 0; i < totalSamples; ++i) {
                    var currentTime = i / sampleRate;
                    var sampleValue = 0;
                    // TODO: Complete the FM waveform generator
                    // Hint: You can use the function lerp() in utility.js 
                    //       for performing linear interpolation
                    var ADSRVal = 1;
                    if (useADSR) {
                        if (i<attackDuration) {
                            ADSRVal = lerp(0,1,i/(attackDuration-1));
                        }
                        else if (attackDuration<=i && i<attackDuration+decayDuration) {
                            ADSRVal = lerp(1,sustainLevel,(i-attackDuration)/(decayDuration-1));
                        } 
                        else if (decayDuration<=i && i<totalSamples-releaseDuration) {
                            ADSRVal = sustainLevel;
                        } else {
                            ADSRVal = lerp(sustainLevel,0,(i-(totalSamples-releaseDuration))/(releaseDuration-1));
                        }
                    }

                    modulationValue = ADSRVal * modulationAmplitude * Math.sin(2.0 * Math.PI * modulationFrequency * currentTime);
                    sampleValue = carrierAmplitude * Math.sin(2.0 * Math.PI * carrierFrequency * currentTime + modulationValue);
                    result.push(sampleValue);
                }
                break;
            case "karplus-strong": // Karplus-Strong algorithm
                /**
                * TODO: Complete this function
                **/

                if($("#karplus-base>option:selected").val() === "256hz-sine") {
                    result = this.generateWaveform("sine-time", 256, 1.0, duration);
                } else {
                    result = this.generateWaveform("white-noise", frequency, 1.0, duration);
                }

                // Obtain all the required parameters
                var b = parseFloat($("#karplus-b").val());   // probability
                var delay = parseInt($("#karplus-p").val()); // delay

                for(var i = delay + 1; i < totalSamples; ++i) {

                    // TODO: Complete the Karplus-Strong generator
                    // Note that the sound buffer already contains the initial
                    // energy. You do not need to push new samples in the
                    // result array as the result array has been filled already

                }
                break;
            case "white-noise": // White noise
                for (var i = 0; i < totalSamples; ++i) {
                    result.push(amp * (Math.random() * 2.0 - 1.0));
                }
                break;
            default:
                break;
        }

        return result;
    }
};

// The object represent the pitch shift algorithms
PitchShift = {
    apply: function(channels, pitchShift) {

        console.log("Applying Pitch Shift. Pitch shift amount: " + pitchShift);

        var originalAudioSequences = [];
        var pitchShiftedAudioSequences = [];
        for(var c = 0; c < channels.length; ++c) {
            // Get the sample data of the channel
            var audioSequence = channels[c].audioSequenceReference;
            originalAudioSequences.push(audioSequence);
            pitchShiftedAudioSequences.push(CreateNewAudioSequence());
        }

        if(pitchShift > 0) { // Shrinking, skipping samples
            console.log("Skipping samples");

            // TODO: Complete the shrinking algorithm by copying
            // the required samples from originalAudioSequences
            // to pitchShiftedAudioSequences

            for(var c = 0; c < channels.length; ++c) {
                for(var i = 0; i < originalAudioSequences[c].data.length; ++i) {

                    // TODO: Not all samples are needed

                    pitchShiftedAudioSequences[c].data.push(originalAudioSequences[c].data[i]);
                }
            }

        } else { // Stretching, inserting samples
            console.log("Inserting samples");

            // TODO: Complete the stretching algorithm by copying
            // the required samples from originalAudioSequences
            // to pitchShiftedAudioSequences

            for(var c = 0; c < channels.length; ++c) {
                for(var i = 0; i < originalAudioSequences[c].data.length; ++i) {

                    // TODO: Some samples may need to be duplicated
                    
                    pitchShiftedAudioSequences[c].data.push(originalAudioSequences[c].data[i]);
                }
            }

        }

        for(var c = 0; c < channels.length; ++c) {
            // Update the sample data
            channels[c].setAudioSequence(pitchShiftedAudioSequences[c]);
        }
    }
};

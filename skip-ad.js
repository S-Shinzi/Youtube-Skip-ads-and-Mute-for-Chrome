//Observe target id
const targetId = '#ytd-player'

const clickSkipAdButton = () => {
    //Ad skip button
    const skipAdButtoon = document.querySelectorAll(".ytp-ad-skip-button-container")[0];
    //Ad preview
    const adPreview = document.querySelectorAll(".ytp-ad-preview-container")[0];

    if(skipAdButtoon) {
        //Can skip Ad
        skipAdButtoon.click();
    }else if(adPreview && !isMute()) {
        //Can not skip Ad & not mute
        clickMuteButton();
    };
};

const clickMuteButton = () => {
    const muteButton = document.querySelectorAll(".ytp-mute-button")[0];
    if(muteButton) muteButton.click();
};

//Mute check
const isMute = () => {
    const muteButton = document.querySelectorAll(".ytp-mute-button")[0];
    if(muteButton) {
        const titleText = muteButton.getAttribute('title');
        const ariaLabel = muteButton.getAttribute('aria-label');
        //Use exists one
        const labelText = titleText || ariaLabel;

        if (labelText) {
            return labelText.includes('解除');
        } else {
            console.error('Both title and aria-label attributes are not present');
        }
    } else {
        console.error('muteButton element is not found');
    }
};

//Ovserver Setting
const config = {
    childList: true,
    subtree: true
};

//Ovserver Instance
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        //Playing Ad
        if(mutation.addedNodes.length && mutation.addedNodes[0].className === 'ytp-ad-player-overlay') {
            clickSkipAdButton();
        };
        //Remove Ad
        if (mutation.removedNodes.length && mutation.removedNodes[0].className === 'ytp-ad-player-overlay') {
            if (isMute()) {
                clickMuteButton();
            }
        }

    });
});

const initInterval = setInterval(() => {
    if( document.querySelector(targetId) != null ) {
      const target = document.querySelector(targetId);
      observer.observe(target, config);
      clearInterval(initInterval);
    }
    clickSkipAdButton();
}, 500);
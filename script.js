  // Monetag voluntary rewarded adverts
  const interstitialButton = $('#rewarded-interstitial-button');
  const popupButton = $('#rewarded-popup-button');

  function handleAdResult(result) {
    if (result?.reward_event_type === 'valued') {
      showToast('Thank you for supporting Jannah Path!');
    } else {
      showToast('No reward confirmation received. Thank you for trying.');
    }
  }

  function handleAdError(error) {
    console.warn('Monetag advert error:', error);
    showToast('Advert unavailable. Please try again later.');
  }

  if (interstitialButton) {
    interstitialButton.addEventListener('click', () => {
      if (typeof window.show_12194311 !== 'function') {
        showToast('Ad service is not ready yet.');
        return;
      }

      interstitialButton.disabled = true;

      Promise.resolve()
        .then(() => window.show_12194311({
          type: 'end',
          requestVar: 'support_interstitial'
        }))
        .then(handleAdResult)
        .catch(handleAdError)
        .finally(() => {
          interstitialButton.disabled = false;
        });
    });
  }

  if (popupButton) {
    popupButton.addEventListener('click', () => {
      if (typeof window.show_12194311 !== 'function') {
        showToast('Ad service is not ready yet.');
        return;
      }

      popupButton.disabled = true;

      try {
        Promise.resolve(window.show_12194311({
          type: 'pop',
          requestVar: 'support_popup'
        }))
          .then(handleAdResult)
          .catch(handleAdError)
          .finally(() => {
            popupButton.disabled = false;
          });
      } catch (error) {
        popupButton.disabled = false;
        handleAdError(error);
      }
    });
  }

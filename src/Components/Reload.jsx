

const Reload = () => {
    if (!window.reloadTriggered) {
        window.reloadTriggered = true;
        window.location.reload();
      }
}

export default Reload

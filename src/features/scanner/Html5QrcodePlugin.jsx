import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {
    const {
        fps,
        qrbox,
        aspectRatio,
        disableFlip,
        verbose,
        qrCodeSuccessCallback,
        qrCodeErrorCallback,
    } = props;

    useEffect(() => {
        // when component mounts
        const config = createConfig({ fps, qrbox, aspectRatio, disableFlip });
        const isVerbose = verbose === true;
        // Suceess callback is required.
        if (!qrCodeSuccessCallback) {
            // eslint-disable-next-line no-throw-literal
            throw new Error("qrCodeSuccessCallback is required callback.");
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, isVerbose);
        html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [fps, qrbox, aspectRatio, disableFlip, verbose, qrCodeSuccessCallback, qrCodeErrorCallback]);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;

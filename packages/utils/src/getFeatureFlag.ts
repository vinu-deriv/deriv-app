// eslint-disable-next-line import/no-extraneous-dependencies
import { Analytics } from '@deriv-com/analytics';

const waitForGrowthbook = () => {
    return new Promise(resolve => {
        const startTime = Date.now();

        const checkAnalytics = async () => {
            // This is a fallback incase growthbook experience an error and never gets loaded
            if (Date.now() - startTime >= 10000) {
                // eslint-disable-next-line no-console
                console.error('Growthbook did not load within the expected 10-second timeframe.');
                resolve(false);
                return;
            }

            if (typeof Analytics !== 'undefined') {
                if (Analytics.getInstances()?.ab !== undefined) {
                    resolve(true);
                } else {
                    const gbState = await Analytics?.getGrowthbookStatus();

                    if (gbState?.isLoaded) {
                        resolve(true);
                    } else {
                        setTimeout(checkAnalytics, 50);
                    }
                }
            } else {
                setTimeout(checkAnalytics, 50);
            }
        };

        checkAnalytics();
    });
};

const getFeatureFlag = async (feature: string, defaultValue?: string | boolean | undefined) => {
    let enabled = false;

    if (typeof window?.GrowthBookFeatures === 'undefined') {
        window.GrowthBookFeatures = {};
    }

    // Avoid rechecks and return previous result immediately
    if (typeof window.GrowthBookFeatures[feature] !== 'undefined') {
        return window.GrowthBookFeatures[feature];
    }

    const isSuccessfullyLoaded = await waitForGrowthbook();

    if (Analytics && isSuccessfullyLoaded) {
        const gbState = await Analytics?.getGrowthbookStatus();

        // If Growthbook has config error, down or encountering issues, feature flag will default to false
        if (gbState.isLoaded && gbState.status?.success) {
            enabled = Analytics.getFeatureValue(feature, !!defaultValue);
        }
    }

    window.GrowthBookFeatures[feature] = enabled;

    return enabled;
};

export default getFeatureFlag;

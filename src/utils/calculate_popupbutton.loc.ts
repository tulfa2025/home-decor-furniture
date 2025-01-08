import { useMemo } from 'react';

/**
 * Custom hook to calculate the position of a popup button based on the viewport size.
 * @param {object} viewportSize - The current viewport size, containing width and height.
 * @returns {object} popupPosition - The calculated position for the popup button.
 */
const usePopupPosition = (viewportSize) => {
    return useMemo(() => {
        const popupPositionInternal = {
            height: 0,
            width: 0,
            left: 0,
            top: 0,
            textStyle: {} // For additional text styling if needed
        };

        if (viewportSize.width < 720) {
            // Mobile/Tablet view
            popupPositionInternal.height = 50;
            popupPositionInternal.width = 200;
            popupPositionInternal.top = viewportSize.height / 1.2;
            popupPositionInternal.left = viewportSize.width / 4;
            popupPositionInternal.textStyle = {
                fontSize: "12px",
                left: "30%" // Position of the text within the popup
            };
        } else {
            // Desktop view
            popupPositionInternal.height = 70;
            popupPositionInternal.width = 300;
            popupPositionInternal.top = viewportSize.height / 1.2;
            popupPositionInternal.left = viewportSize.width / 2.5;
        }

        return popupPositionInternal;
    }, [viewportSize]); // Recalculate the position when viewportSize changes
};

export default usePopupPosition;
import React from 'react';
import { Button } from '@deriv/components';
import { localize } from '@deriv/translations';
import { observer } from '@deriv/stores';
import { isMobile } from '@deriv/shared';
import { useDBotStore } from 'Stores/useDBotStore';
import './index.scss';

const LocalFooter = observer(() => {
    const { load_modal, dashboard } = useDBotStore();
    const { is_open_button_loading, loadFileFromLocal, setLoadedLocalFile, toggleLoadModal } = load_modal;
    const { setPreviewOnPopup } = dashboard;

    const is_mobile = isMobile();
    const Wrapper = is_mobile ? Button.Group : React.Fragment;
    return (
        <Wrapper>
            {is_mobile && (
                <Button text={localize('Cancel')} onClick={() => setLoadedLocalFile(null)} has_effect secondary large />
            )}
            <Button
                text={localize('Open')}
                onClick={() => {
                    loadFileFromLocal();
                    setPreviewOnPopup(false);
                    toggleLoadModal();
                }}
                is_loading={is_open_button_loading}
                has_effect
                primary
                large
            />
        </Wrapper>
    );
});

export default LocalFooter;

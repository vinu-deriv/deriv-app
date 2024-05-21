import React, { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import { useHover } from 'usehooks-ts';
import { Tooltip, WalletCheckbox, WalletsPriorityCryptoWithdrawLoader } from '../../../../../../../../components';
import InfoIcon from '../../../../../../../../public/images/ic-checkmark.svg';
import { useWithdrawalCryptoContext } from '../../../../provider';
import { WithdrawalCryptoPriorityFeeInfo } from '../WithdrawalCryptoPriorityFeeInfo';
import './WithdrawalCryptoPriority.scss';

const WithdrawalCryptoPriority = () => {
    const { handleChange, values } = useFormikContext<{
        cryptoAmount: string;
        priorityWithdrawal: boolean;
    }>();

    const { activeWallet, cryptoEstimationsError, getCryptoEstimations, isLoadingCryptoEstimationFee, setError } =
        useWithdrawalCryptoContext();

    const hoverRef = useRef(null);
    const isHovered = useHover(hoverRef);

    useEffect(() => {
        if (cryptoEstimationsError) {
            setError(cryptoEstimationsError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cryptoEstimationsError]);
    return (
        <>
            <div className='wallets-crypto-form-checkbox'>
                <WalletCheckbox
                    checked={values.priorityWithdrawal}
                    label={'Priority withdrawal'}
                    labelFontSize='md'
                    name='priorityWithdrawal'
                    onChange={e => {
                        if (!values.priorityWithdrawal) {
                            getCryptoEstimations(activeWallet?.currency ?? '');
                        }
                        handleChange(e);
                    }}
                />
                <Tooltip
                    alignment='top'
                    isVisible={isHovered}
                    message='Pay a small fee to prioritise your withdrawal, this fee will be deducted from the withdrawal amount.'
                >
                    <div ref={hoverRef}>
                        <InfoIcon />
                    </div>
                </Tooltip>
            </div>
            {isLoadingCryptoEstimationFee && <WalletsPriorityCryptoWithdrawLoader />}
            {!isLoadingCryptoEstimationFee && values.priorityWithdrawal && (
                <WithdrawalCryptoPriorityFeeInfo cryptoAmount={values.cryptoAmount} />
            )}
        </>
    );
};

export default WithdrawalCryptoPriority;

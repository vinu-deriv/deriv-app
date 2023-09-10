import React from 'react';
import classNames from 'classnames';
import { isMobile } from '@deriv/shared';
import { TInputsFieldNames } from '../quick-strategy.types';
import { TInputs } from './components.types';
import { InputField } from '.';

const Inputs = ({
    field_name,
    id,
    className,
    label,
    input_value,
    placeholder,
    trailing_icon_message,
    zIndex,
    errors,
    is_input_field,
    handleChange,
    onChangeInputValue,
    setCurrentFocus,
}: TInputs) => {
    const is_mobile = isMobile();
    return is_input_field ? (
        <div
            className={classNames('quick-strategy__form-row', {
                'quick-strategy__form-row--multiple': !is_mobile,
            })}
        >
            <InputField
                handleChange={handleChange}
                onChangeInputValue={onChangeInputValue}
                setCurrentFocus={setCurrentFocus}
                is_mobile={is_mobile}
                field_name={field_name as TInputsFieldNames}
                id={id}
                className={className}
                label={label}
                input_value={input_value}
                placeholder={placeholder}
                trailing_icon_message={trailing_icon_message}
                zIndex={zIndex}
                errors={errors}
            />
        </div>
    ) : (
        <></>
    );
};

Inputs.displayName = 'Inputs';

export default React.memo(Inputs);

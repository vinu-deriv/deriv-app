import React from 'react';
import classNames from 'classnames';
import { Analytics } from '@deriv/analytics';
import { shuffleArray } from '@deriv/shared';
import { Button, Text } from '@deriv/components';
import './questionnaire-modal.scss';

type TAnswers = {
    code: string;
    text: string;
    header?: string;
};
type TABQuestionnaire = {
    id: string;
    question: string;
    show_answers_in_random_order: boolean;
    answers: TAnswers[];
};
export type TQuestionnaireModal = {
    ab_questionnaire: TABQuestionnaire;
    handleSignup: (...args: any) => void;
};

const QuestionnaireModal = ({ ab_questionnaire, handleSignup }: TQuestionnaireModal) => {
    const a_variant = !!ab_questionnaire.answers?.[0]?.header;
    const shuffled_questionnaire = ab_questionnaire?.show_answers_in_random_order
        ? shuffleArray(ab_questionnaire.answers)
        : ab_questionnaire.answers;

    React.useEffect(() => {
        Analytics.trackEvent('ce_questionnaire_form', {
            action: 'open',
            question_content: ab_questionnaire,
        });
    }, [ab_questionnaire]);

    const onClickAnswer = (answer_code: string, answer_index: number, answer_content: any) => {
        Analytics.trackEvent('ce_questionnaire_form', {
            action: 'choose_answer',
            question: ab_questionnaire.question,
            answer_content,
            answer_code,
            answer_index,
        });
        handleSignup();
    };

    return (
        <div className='questionnaire-modal'>
            <Text as='h2' size='xs' weight='bold' align='center'>
                {ab_questionnaire.question}
            </Text>
            <ul
                data-testid='questionnaire-modal-variant'
                className={classNames({
                    'questionnaire-modal__answers': a_variant,
                    'questionnaire-modal__options': !a_variant,
                })}
            >
                {shuffled_questionnaire.map(({ code, text, header }, index) => {
                    return (
                        <Button
                            key={`${code}_questionnaire`}
                            data-testid={`${code}_questionnaire`}
                            onClick={() =>
                                onClickAnswer(code, index, { answer_content: shuffled_questionnaire[index] })
                            }
                            style={{ height: 'unset', padding: 'unset' }}
                            transparent
                        >
                            <li
                                className={classNames({
                                    'questionnaire-modal__answers_content': a_variant,
                                    'questionnaire-modal__options_card': !a_variant,
                                })}
                            >
                                {header && (
                                    <Text as='p' size='xs' weight='bold'>
                                        {header}
                                    </Text>
                                )}
                                <Text as='p' size='xs'>
                                    {text}
                                </Text>
                            </li>
                        </Button>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuestionnaireModal;

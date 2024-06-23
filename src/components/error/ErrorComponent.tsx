import React, {FC} from 'react';
import css from '../../styles/error.module.css';
import css_common from "../../styles/css_common/button.module.css";
import {Button} from "../buttons/Button";

const ErrorComponent: FC = () => {

    return (
        <div className={css.fullscreenContainer}>
            <div>
                <div className={css.errorContent}>
                    <div className={css.errorIcon}>⚠️</div>
                    <h2 className={css.errorTitle}>Page not found !!!</h2>
                    <p>You are trying to go to a page that does not exist.</p>
                    <p>press the button to go back</p>
                    <Button className={css_common.generalButton}/>
                </div>
            </div>
        </div>
    );
};

export {ErrorComponent};

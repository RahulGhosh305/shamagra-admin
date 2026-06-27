import Swal from "sweetalert2";
import {notification, Button} from "antd";
import React from 'react';

interface alert {
    title?: string,
    icon?: any,
    timer?: number,
    code?: number,
    position?: any,
    showConfirmButton?: boolean,
}

interface confirm {
    title?: string,
    text?: string,
    icon?: any,
    showCancelButton?: boolean,
    confirmButtonText?: string
}

interface callback {
    (message: string): void;
}

export const successAlert = (props: alert): void => {
    notification['success']({
        message: props.code ?? 200,
        description: (props.title ? props.title : "Success!").toUpperCase(),
    });
}

export const warningAlert = (props: alert): void => {
    notification['warning']({
        message: props.code ?? 300,
        description: (props.title ? props.title : "Warning!").toUpperCase(),
    });
}

export const errorAlert = (props: alert): void => {
    notification['error']({
        message: props.code ?? 400,
        description: (props.title ? props.title : "Something Went Wrong!").toUpperCase(),
    });
}

export const infoAlert = (props: alert, callback: callback): void => {
    notification['info']({
        message: props.code ?? 200,
        description: (props.title ? props.title : "Info!").toUpperCase(),
    });
}

export const confirmAlert = (props: confirm, callback: callback): void => {
    const key = `open${Date.now()}`;

    // eslint-disable-next-line react/no-children-prop
    const btn = React.createElement(Button, {
        type: 'primary',
        size: 'small',
        onClick: () => {
            notification.close(key);
            callback("done")
        },
        children: 'Confirm',
    });
    notification.open({
        message: 'Are you sure?',
        description: 'Once you do this, data cannot be revoked.',
        btn,
        key,
    });
}

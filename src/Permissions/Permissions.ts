import {PermissionsAndroid} from 'react-native';
//import { LogAccess } from "../../access/db";

export async function requestWriteStoragePermission(
  callback: Function,
  callbackCancel?: Function,
) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'اجازه دسترسی به حافظه',
        message: 'برای ذخیره کردن فایل، باید اجازه دسترسی بدهید:',
        buttonNeutral: 'شاید بعدا',
        buttonNegative: 'نیاز نیست',
        buttonPositive: 'قبول',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      callback && callback();
    } else {
      callbackCancel && callbackCancel();
    }
  } catch (err) {
    //LogAccess.SaveException(err);

    callbackCancel && callbackCancel();
  }
}

export async function requestReadStoragePermission(
  callback: Function,
  callbackCancel?: Function,
) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'اجازه دسترسی به حافظه',
        message: 'برای باز کردن فایل، باید اجازه دسترسی بدهید:',
        buttonNeutral: 'شاید بعدا',
        buttonNegative: 'نیاز نیست',
        buttonPositive: 'قبول',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      callback && callback();
    } else {
      callbackCancel && callbackCancel();
    }
  } catch (err) {
    // LogAccess.SaveException(err);
    callbackCancel && callbackCancel();
  }
}

export async function requestReadSMS(
  callback: Function,
  callbackCancel?: Function,
) {
  await requestSMS(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    callback,
    callbackCancel,
  );
}

export async function requestSendSMS(
  callback: Function,
  callbackCancel?: Function,
) {
  await requestSMS(
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
    callback,
    callbackCancel,
  );
}

export async function requestWriteSMS(
  callback: Function,
  callbackCancel?: Function,
) {
  await requestSMS(
    PermissionsAndroid.PERMISSIONS.WRITE_SMS,
    callback,
    callbackCancel,
  );
}

export async function requestSMS(
  permission: any,
  callback: Function,
  callbackCancel?: Function,
) {
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: 'دسترسی به پیامک',
      message: ' اجازه دسترسی می‌دهید؟',
      buttonNeutral: 'شاید بعدا',
      buttonNegative: 'نیاز نیست',
      buttonPositive: 'قبول',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      callback && callback();
    } else {
      callbackCancel && callbackCancel();
    }
  } catch (err) {
    //LogAccess.SaveException(err);
    callbackCancel && callbackCancel();
  }
}

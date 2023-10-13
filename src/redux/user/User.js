import * as UserService from "../../services/UserService";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userSlice";

export const updateName = (uid, name) => async (dispatch) => {
    dispatch(updateStart());
    try {
        const response = await UserService.updateNameUser(uid, name);
        if (response.status === true) {
        dispatch(updateSuccess(response));
        } else 
            dispatch(updateFailure(response));
    } catch (err) {
        dispatch(updateFailure({ error: true, message: err.message }));     
    }
};

export const updateInfo = (
    uid,
    age,
    gender,
    height,
    weight,
    exercise ) => async (dispatch) => {
    dispatch(updateStart());
    try {
        const response = await UserService.updateInfoUser(uid,
            age,
            gender,
            height,
            weight,
            exercise );
        if (response.status === true) {
        dispatch(updateSuccess(response));
        } else 
            dispatch(updateFailure(response));
    } catch (err) {
        dispatch(updateFailure({ error: true, message: err.message }));     
    }
};
export const updateAim = (uid, aim, navigate) => async (dispatch) => {
    dispatch(updateStart());
    try {
        const response = await UserService.updateAimUser(uid, aim);
        if (response.status === true) {
            dispatch(updateSuccess(response));
            navigate("/");
        } else 
            dispatch(updateFailure(response));
    } catch (err) {
        dispatch(updateFailure({ error: true, message: err.message }));     
    }
};
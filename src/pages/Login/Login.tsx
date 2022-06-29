import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_ACTIONS } from "../../redux/actions/auth.action";
import { pathNames } from "../../routes/pathNames";

interface Props {}

const Login = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const login = () => {
    dispatch(AUTH_ACTIONS.login({ role: ["ISSUER"] }));
    navigate(pathNames.DASHBOARD, { replace: true });
  };

  return <div onClick={() => login()}>Login Me in to React</div>;
};

export default Login;

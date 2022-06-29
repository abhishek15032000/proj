import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authCalls } from "../../api/authCalls";
import { AUTH_ACTIONS } from "../../redux/actions/auth.action";
import { pathNames } from "../../routes/pathNames";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const login = () => {
    dispatch(AUTH_ACTIONS.login({ role: ["BHI"] }));
    navigate(pathNames.DASHBOARD, { replace: true });
  };

  return <div onClick={() => authCalls.login()}>Login Me in to React</div>;
};

export default Login;

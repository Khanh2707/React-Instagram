import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";

import styles from "./Login.module.css";

import { useToastMessage } from "../../Context/ToastMessageContext";
import ToastMessage from "../../Components/ToastMessage";
import * as http from "../../utils/http";

const cx = classNames.bind(styles);

function Register() {
  useEffect(() => {
    document.title = "Đăng ký tài khoản | Instagram";
  }, []);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [idUser, setIdUser] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isDataReady, setIsDataReady] = useState(false);

  const dataAccount = {
    account: username,
    password: password,
    code: code,
    idUser: idUser,
    name: fullName,
  };

  const navigate = useNavigate();

  function handleNavigateLogin() {
    navigate("/login");
  }

  useEffect(() => {
    function Validator(options) {
      function getParent(element, selector) {
        while (element.parentElement) {
          if (element.parentElement.matches(selector)) {
            return element.parentElement;
          }
          element = element.parentElement;
        }
      }

      var selectorRules = {};

      function validate(inputElement, rule) {
        var errorElement = getParent(
          inputElement,
          options.formGroupSelector
        ).querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; ++i) {
          switch (inputElement.type) {
            case "radio":
            case "checkbox":
              errorMessage = rules[i](
                formElement.querySelector(rule.selector + ":checked")
              );
              break;
            default:
              errorMessage = rules[i](inputElement.value);
          }
          if (errorMessage) break;
        }

        if (errorMessage) {
          errorElement.innerText = errorMessage;
          getParent(inputElement, options.formGroupSelector).classList.add(
            cx("invalid")
          );
        } else {
          errorElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove(
            cx("invalid")
          );
        }

        return !errorMessage;
      }

      var formElement = document.querySelector(options.form);

      if (formElement) {
        formElement.onsubmit = function (e) {
          e.preventDefault();

          var isFormValid = true;

          options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(inputElement, rule);
            if (!isValid) {
              isFormValid = false;
            }
          });

          if (isFormValid) {
            if (typeof options.onSubmit === "function") {
              var enableInputs = formElement.querySelectorAll(
                "[name]:not([disabled])"
              );

              var formValues = Array.from(enableInputs).reduce(function (
                values,
                input
              ) {
                switch (input.type) {
                  case "radio":
                    values[input.name] = formElement.querySelector(
                      'input[name="' + input.name + '"]:checked'
                    ).value;
                    break;
                  case "checkbox":
                    if (!input.matches(":checked")) {
                      values[input.name] = "";
                      return values;
                    }

                    if (!Array.isArray(values[input.name])) {
                      values[input.name] = [];
                    }

                    values[input.name].push(input.value);

                    break;
                  case "file":
                    values[input.name] = input.files;
                    break;
                  default:
                    values[input.name] = input.value;
                }

                return values;
              },
              {});

              options.onSubmit(formValues);
            } else {
              formElement.submit();
            }
          }
        };

        options.rules.forEach(function (rule) {
          if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
          } else {
            selectorRules[rule.selector] = [rule.test];
          }

          var inputElements = formElement.querySelectorAll(rule.selector);

          Array.from(inputElements).forEach(function (inputElement) {
            inputElement.onblur = function () {
              validate(inputElement, rule);
            };

            inputElement.oninput = function () {
              var errorElement = getParent(
                inputElement,
                options.formGroupSelector
              ).querySelector(options.errorSelector);
              errorElement.innerText = "";
              getParent(
                inputElement,
                options.formGroupSelector
              ).classList.remove(cx("invalid"));
            };
          });
        });
      }
    }

    Validator.isRequired = function (selector, message) {
      return {
        selector: selector,
        test: function (value) {
          return value ? undefined : message || "Vui lòng nhập trường này";
        },
      };
    };

    Validator.isEmail = function (selector, message) {
      return {
        selector: selector,
        test: function (value) {
          var regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(value)
            ? undefined
            : message || "Trường này phải là email !";
        },
      };
    };

    Validator.minLength = function (selector, min, message) {
      return {
        selector: selector,
        test: function (value) {
          return value.length >= min
            ? undefined
            : message || `Mật khẩu tối thiểu ${min} ký tự !`;
        },
      };
    };

    Validator.isConfirmed = function (selector, getConfirmValue, message) {
      return {
        selector: selector,
        test: function (value) {
          return value === getConfirmValue()
            ? undefined
            : message || "Giá trị không chính xác";
        },
      };
    };

    Validator({
      form: "#" + cx("form-1"),
      formGroupSelector: "." + cx("form-group"),
      errorSelector: "." + cx("form-message"),
      rules: [
        Validator.isRequired("#" + cx("fullname"), "Vui lòng nhập tên"),
        Validator.isRequired("#" + cx("id"), "Vui lòng nhập Id"),
        Validator.isRequired("#" + cx("email"), "Vui lòng nhập Email"),
        Validator.isEmail("#" + cx("email")),
        Validator.isRequired(
          "#" + cx("code"),
          "Vui lòng nhập mã xác nhận Email"
        ),
        Validator.isRequired("#" + cx("password"), "Vui lòng nhập Password"),
        Validator.minLength("#" + cx("password"), 8),
        Validator.isRequired(
          "#" + cx("password_confirmation"),
          "Vui lòng nhập lại Password"
        ),
        Validator.isConfirmed(
          "#" + cx("password_confirmation"),
          function () {
            return document.querySelector(`#${cx("form-1")} #${cx("password")}`)
              .value;
          },
          "Mật khẩu nhập lại không chính xác"
        ),
      ],
      onSubmit: function (data) {
        setUsername(data.email);
        setPassword(data.password);
        setIdUser(data.id);
        setFullName(data.fullname);
        setCode(data.code);
        setIsDataReady(true);
      },
    });
  }, []);

  useEffect(() => {
    if (isDataReady) {
      registerAccount();
    }
  }, [isDataReady]);

  function registerAccount() {
    http
      .post("api/accounts", dataAccount)
      .then((res) => {
        console.log(res);
        setIsDataReady(false);
      })
      .catch((error) => {
        if (error.response.data.code === 1001) {
          showToastError("Email đã tồn tại.");
        } else if (error.response.data.code === 1005) {
          showToastError("Id user đã tồn tại.");
        } else if (error.response.data.code === 1011) {
          showToastError("Mã xác nhận chưa chính xác.");
        } else {
          showToastError("Có lỗi.");
        }
        setIsDataReady(false);
      });
  }

  const [email, setEmail] = useState("");
  const messageInvalidEmail = useRef();

  const verifyEmailGenerate = () => {
    if (messageInvalidEmail.current.textContent === "" && email !== "") {
      showToastInfo("Đang gửi mã xác thực đến email của bạn.");
      http
        .post(`api/verify_email`, {
          email: email,
        })
        .then((res) => {
          showToastSuccess("Kiểm tra email của bạn để lấy mã xác thực.");
        });
    } else {
      showToastError("Email chưa nhập đúng định dạng.");
    }
  };

  const { setToastMessage } = useToastMessage();

  function showToastSuccess(message) {
    setToastMessage({
      title: "Thành công!",
      message: message ? message : "Bạn đã đăng ký tài khoản thành công.",
      type: "success",
      duration: 3000,
    });
  }

  function showToastError(message) {
    setToastMessage({
      title: "Thất bại!",
      message: message ? message : "Lỗi",
      type: "error",
      duration: 3000,
    });
  }

  function showToastInfo(message) {
    setToastMessage({
      title: "Thông báo!",
      message: message ? message : "Thông báo.",
      type: "info",
      duration: 3000,
    });
  }

  return (
    <>
      <div className={cx("main")}>
        <form action='' method='POST' className={cx("form")} id='form-1'>
          <h3 className={cx("heading")}>Đăng ký</h3>
          <p className={cx("desc")}>Kết nối với mọi người qua Instagram ❤️</p>

          <div className={cx("spacer")}></div>

          <div className={cx("form-group")}>
            <label htmlFor='fullname' className={cx("form-label")}>
              Tên đầy đủ
            </label>
            <input
              id='fullname'
              name='fullname'
              type='text'
              placeholder='VD: Phúc Khánh'
              className={cx("form-control")}
            />
            <span className={cx("form-message")}></span>
          </div>

          <div className={cx("form-group")}>
            <label htmlFor='id' className={cx("form-label")}>
              Id
            </label>
            <input
              id='id'
              name='id'
              type='text'
              placeholder='VD: tp_khanh'
              className={cx("form-control")}
            />
            <span className={cx("form-message")}></span>
          </div>

          <div className={cx("form-group")}>
            <label htmlFor='email' className={cx("form-label")}>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='text'
              placeholder='VD: email@domain.com'
              className={cx("form-control")}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span
              className={cx("form-message")}
              ref={messageInvalidEmail}
            ></span>
          </div>

          <div className={cx("form-group")}>
            <label htmlFor='code' className={cx("form-label")}>
              Mã xác nhận Email
            </label>
            <input
              id='code'
              name='code'
              type='text'
              placeholder='VD: 123456'
              className={cx("form-control")}
            />
            <span className={cx("send_code")} onClick={verifyEmailGenerate}>
              Gửi mã
            </span>
            <span className={cx("form-message")}></span>
          </div>

          <div className={cx("form-group")}>
            <label htmlFor='password' className={cx("form-label")}>
              Mật khẩu
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Nhập mật khẩu'
              className={cx("form-control")}
            />
            <span className={cx("form-message")}></span>
          </div>

          <div className={cx("form-group")}>
            <label htmlFor='password_confirmation' className={cx("form-label")}>
              Nhập lại mật khẩu
            </label>
            <input
              id='password_confirmation'
              name='password_confirmation'
              placeholder='Nhập lại mật khẩu'
              type='password'
              className={cx("form-control")}
            />
            <span className={cx("form-message")}></span>
          </div>

          <button className={cx("form-submit")}>Đăng ký</button>

          <div className={cx("spacer")}></div>

          <div className={cx("swap")}>
            <span className={cx("swap__title")}>Bạn đã có tài khoản?</span>
            <span className={cx("swap__button")} onClick={handleNavigateLogin}>
              Đăng nhập
            </span>
          </div>
        </form>
      </div>
      <ToastMessage />
    </>
  );
}

export default Register;

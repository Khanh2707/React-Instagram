import { useContext, useEffect } from "react";

import classNames from "classnames/bind";

import styles from "./ChangePassword.module.css";

import { AppContext } from "../../Context/AppContext";
import { useToastMessage } from "../../Context/ToastMessageContext";
import * as http from "../../utils/http";

const cx = classNames.bind(styles);

function ChangePassword() {
  const { setIsLoadingLine } = useContext(AppContext);
  useEffect(() => {
    setIsLoadingLine(true);
  }, []);
  //
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingLine(false);
    }, 500);
  }, []);

  useEffect(() => {
    document.title = "Thay đổi mật khẩu | Instagram";
  }, []);

  const { account } = useContext(AppContext);

  const changePassword = async (data) => {
    try {
      const res = await http.put(`api/accounts/password/${account}`, {
        password: data.new_password,
        currentPassword: data.current_password,
      });
      showToastSuccess();
    } catch (error) {
      showToastError();
    }
  };

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

    Validator.maxLength = function (selector, max, message) {
      return {
        selector: selector,
        test: function (value) {
          return value.length <= max
            ? undefined
            : message || `Tiểu sử không được vượt quá ${max} ký tự !`;
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
        Validator.isRequired(
          "#" + cx("current_password"),
          "Vui lòng nhập Password hiện tại"
        ),
        Validator.isRequired(
          "#" + cx("new_password"),
          "Vui lòng nhập Password mới"
        ),
        Validator.minLength("#" + cx("new_password"), 8),
        Validator.isRequired(
          "#" + cx("new_password_confirmation"),
          "Vui lòng nhập lại Password mới"
        ),
        Validator.isConfirmed(
          "#" + cx("new_password_confirmation"),
          function () {
            return document.querySelector(
              `#${cx("form-1")} #${cx("new_password")}`
            ).value;
          },
          "Mật khẩu nhập lại không chính xác"
        ),
      ],
      onSubmit: function (data) {
        changePassword(data);
      },
    });
  }, [account]);

  const { setToastMessage } = useToastMessage();

  function showToastSuccess() {
    setToastMessage({
      title: "Thành công!",
      message: "Thay đổi mật khẩu thành công.",
      type: "success",
      duration: 3000,
    });
  }

  function showToastError() {
    setToastMessage({
      title: "Thất bại!",
      message: "Thay đổi mật khẩu thất bại.",
      type: "error",
      duration: 3000,
    });
  }

  return (
    <div className={cx("edit_account__background")}>
      <div className={cx("edit_account__container")}>
        <div className={cx("edit_account__title")}>
          <span>Thay đổi mật khẩu</span>
        </div>
        <form action='' method='POST' className={cx("form")} id='form-1'>
          <div className={cx("form-group")}>
            <label htmlFor='current_password' className={cx("form-label")}>
              Mật khẩu hiện tại
            </label>
            <input
              id='current_password'
              name='current_password'
              type='password'
              placeholder='Nhập mật khẩu hiện tại'
              className={cx("form-control")}
            />
            <span className={cx("form-message")}></span>
          </div>

          <div className={cx("form-group")}>
            <label htmlFor='new_password' className={cx("form-label")}>
              Mật khẩu mới
            </label>
            <input
              id='new_password'
              name='new_password'
              type='password'
              placeholder='Nhập mật khẩu mới'
              className={cx("form-control")}
            />
            <span className={cx("form-message")}></span>
          </div>

          <div className={cx("form-group")}>
            <label
              htmlFor='new_password_confirmation'
              className={cx("form-label")}
            >
              Nhập lại mật khẩu mới
            </label>
            <input
              id='new_password_confirmation'
              name='new_password_confirmation'
              placeholder='Nhập lại mật khẩu mới'
              type='password'
              className={cx("form-control")}
            />
            <span className={cx("form-message")}></span>
          </div>

          <div className={cx("edit_account__submit")}>
            <button
              className={cx(
                "edit_account__submit__submit_button",
                "form-submit",
                "active"
              )}
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;

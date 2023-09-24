export const customErrors = (code: string) => {
  const errorCodes = [
    "auth/email-already-exists",
    "auth/email-already-in-use",
    "auth/internal-error",
    "auth/invalid-email",
  ];
  const codeIndex = errorCodes.indexOf(code);

  let message = "";

  switch (codeIndex) {
    case 0:
      message = "이미 가입된 이메일이에요. 로그인 해주세요 🤪";
      break;
    case 1:
      message = "이미 누군가 사용하고 있는 이메일이에요 🥲";
      break;
    case 2:
      message = "오류가 발생했어요. 잠시 후 다시 시도해주세요 🙏🏻";
      break;
    case 3:
      message = "존재하지 않는 이메일이에요. 회원가입을 먼저 해주세요 😊";
      break;
    default:
      message = "오류가 발생했어요. 잠시 후 다시 시도해주세요 🙏🏻";
  }
  return message;
};

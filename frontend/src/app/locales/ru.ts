export default {
  translation: {
    header: {
      imgAlt: 'АлёОпт - лучший магазин аксессуаров для телефонов в Новороссийске',
      logoutBtn: 'Выйти',
    },
    footer: {
      title: 'Лучший магазин аксессуаров для телефонов',
      iconTg: 'АлёОпт в Telegram',
      iconVk: 'АлёОпт в Вконтакте',
      iconIn: 'АлёОпт в том, что нельзя называть...',
    },
    loginPage: {
      title: 'Авторизуйтесь',
      inputs: {
        username: 'Введите логин',
        password: 'Введите пароль',
      },
    },
    mainPage: {
      title: ', Добро пожаловать',
      inputs: {
        firstName: ' Имя: ',
        lastName: 'Фамилия:',
      },
      startQuiz: {
        title: 'Хочешь пройти тест снова?',
        subTitle: 'Жми кнопку!',
        btn: 'Охх, ну понеслось...',
      },
      contQuiz: {
        title: 'Есть незаконченный тест!',
        subTitle: 'Хочешь продолжить?',
        btnCont: 'Да, погнали!',
        btnReset: 'Нет, хочу с начала!',
      },
    },
    quizPage: {
      quizStep: {
        btn: 'Подтвердить',
      },
      quizProgress: {
        from: ' из ',
      },
      quizFinished: {
        title: {
          main: 'Ваш результат - ',
          from: ' из ',
        },
        btn: 'Отправить',
      },
    },
    adminPage: {
      link: {
        users: 'Пользователи',
        questions: 'Вопросы',
      },
      users: {
        title: 'Сотрудники АлёОпт',
        btnNewUser: 'Создать',
      },
      questions: {
        title: 'Актуальные вопросы',
        btnNewUser: 'Добавить',
      },
      userAccordionBody: {
        inputRole: 'Роль:',
        inputUsername: 'Username:',
        noData: 'Данных по пользователю пока нет',
      },
    },
    entities: {
      userStats: {
        numberAttempts: 'Количество попыток -  ',
        averageScore: 'средний балл',
        table: {
          title: 'Результаты последних попыток',
          column1: 'Дата',
          column2: 'Результат',
        },
        isLoading: 'Получение данных...',
        requestError: 'Данных по пользователю нет. Или они не загружены',
      },
      userBar: {
        title: 'Диаграмма ответов',
      },
    },
    shared: {
      buttons: {
        changeGroup: {
          del: 'Удалить',
          edit: 'Изменить',
        },
      },
      modals: {
        userDel: 'пользователя - ',
        userDelFirstName: 'Имя:',
        userDelLastName: 'Фамилия:',
        questionDel: 'вопроса № ',
        questionDelQuestion: 'Вопрос:',
        confirmDel: 'Подтвердите удаление ',
        btnCancel: 'Отменить',
        btnDelete: 'Удалить',
        newUserModal: {
          title: 'Создание нового пользователя',
          inputFirstName: 'Введите имя',
          inputLastName: 'Введите фамилию',
          inputUsername: 'Придумайте логин',
          inputPasswordShow: 'Придумайте пароль',
          inputPasswordHidden: 'Пароль скрыт',
          selectRole: 'Выберите роль пользователя',
          currentRole: 'Роль по-умолчанию - Employee ',
        },
        editUserModal: {
          title: 'Редактирование данных пользователя',
          inputFirstName: 'Текущее имя',
          inputLastName: 'Текущая фамилия',
          inputUsername: 'Текущий логин',
          inputPasswordShow: 'Текущий пароль',
          inputPasswordHidden: 'Пароль скрыт',
          selectRole: 'Текущая роль пользователя',
          currentRole: 'Текущая роль - ',
          changePass: 'Изменить пароль',
        },
        newQuestionModal: {
          title: 'Создание нового вопроса',
          inputQuestion: 'Введите вопрос',
          inputAnswer: 'Введите ответ ',
          selectCorrectAnswer: 'Варианты ответов',
          selectValue: 'Ответ ',
          currentCorrectAnswer: 'Выберите верный',
        },
        editQuestionModal: {
          title: 'Редактирование вопроса',
          inputQuestion: 'Текущий вопрос',
          inputAnswer: 'Текущий ответ ',
          selectCorrectAnswer: 'Варианты ответов',
          selectValue: 'Ответ ',
          currentCorrectAnswer: 'Текущий верный ответ - ',
        },
        btnCreate: 'Сохранить',
      },
    },
    errors: {
      usernameLength: 'Логин должен быть от 4 до 20 символов',
      usernameRequired: 'Логин обязателен',
      passwordLength: 'Пароль должен быть от 6 до 20 символов',
      passwordRequired: 'Пароль обязателен',
      firstNameRequired: 'Имя обязательно',
      lastNameRequired: 'Фамилия обязательна',
      roleRequired: 'Роль обязательна',
      questionRequired: 'Вопрос обязателен',
      correctAnswerRequired: 'Верный ответ обязателен',
      currentAnswerRequired: 'Ответ обязателен',
      InvalidUserData: 'Неверный логин или пароль',
      userExists: 'Логин уже занят',
    },
  },
};

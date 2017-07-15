<template lang="html">
  <nav class="navbar">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="http://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28">
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          Home
        </div>
      </div>
      <div class="navbar-end">
        <div v-if="isLogin === false" class="navbar-item">
          <!-- TODO Add Login Verification -->
          <input class="input" type="text" name="emailInput" v-model="emailInput" placeholder="Email">
          <input class="input" type="password" name="passwordInput" v-model="passwordInput" placeholder="Password">
          <button class="button is-primary" type="button" name="loginBtn" @click='userLogin'> Login </button>
          <button class="button" type="button" name="signupModalBtn" @click='modalSignUpShow'> Sign Up </button>
        </div>
        <div v-if="isLogin === true" class="navbar-item">
          <p> Hello, {{userFullname}} </p>
          <button class='button' type="button" name="logOutBtn" @click='userLogout'> Log Out</button>
          <button class='button' type="postBtn" name="button" @click='modalPostQuestionShow'> Post </button>
        </div>
      </div>
    </div>
    <!-- Modal Sign Up -->
    <div :class="modalSignUp">
      <div class="modal-background">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title"> Sign Up Form</p>
          </header>
          <section class="modal-card-body">
            <input class='input signup' type="text" name="fullnameSignUpInput" v-model="fullnameSignUpInput" placeholder="Enter your full name here">
            <br>
            <input class='input signup' type="text" name="emailSignUpInput" v-model="emailSignUpInput" placeholder="Enter your email here">
            <br>
            <input class='input signup' type="text" name="usernameSignUpInput" v-model="usernameSignUpInput" placeholder="Enter your username here">
            <br>
            <input class='input signup' type="password" name="passwordSignUpInput" v-model="passwordSignUpInput" placeholder="Enter your password here">
            <br>
            <input class='input signup' type="password" name="confirmPassSignUpInput" v-model="confirmPassSignUpInput" placeholder="Confirm your password here">
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" type="button" name="signUpBtn" @click='userSignUp'> Sign Up </button>
            <button class="button is-warning" type="button" name="cancelSignUpBtn" @click='closeModal'> Cancel </button>
          </footer>
        </div>
      </div>
    </div>
    <!-- Modal Post -->
    <div :class="modalPostQuestion">
      <div class="modal-background">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title"> Post New Question </p>
          </header>
          <section class="modal-card-body">
            <input v-model='questionTitle' class='input' type="text" name="questionTitle" placeholder="Put your question title here">
            <textarea v-model='questionDesc' class='textarea' name="questionDesc" rows="8" cols="80"></textarea>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" name="postQouestionBtn" @click='postQuestion'> Post Question</button>
            <button class='button' type="button" name="cancelQuestionBtn" @click='closeModal'> Cancel </button>
          </footer>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      modalSignUp: 'modal',
      modalPostQuestion: 'modal',
      isLogin: false,
      userFullname: '',
      emailInput: '',
      passwordInput: '',
      fullnameSignUpInput: '',
      emailSignUpInput: '',
      usernameSignUpInput: '',
      passwordSignUpInput: '',
      confirmPassSignUpInput: '',
      questionTitle: '',
      questionDesc: ''
    }
  },
  methods: {
    userLogin: function () {
      var self = this
      axios.post('http://localhost:3000/auth/signin', {
        email: self.emailInput,
        password: self.passwordInput
      })
      .then(function (loginUser) {
        window.localStorage.setItem('token', loginUser.data.token)
        self.userFullname = loginUser.data.fullname
        self.isLogin = true
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    userLogout: function () {
      var self = this
      window.localStorage.removeItem('token')
      self.isLogin = false
      self.userFullname = ''
    },
    userSignUp: function () {
      var self = this
      if (self.passwordSignUpInput === self.confirmPassSignUpInput) {
        axios.post('http://localhost:3000/auth/signup', {
          fullname: self.fullnameSignUpInput,
          username: self.usernameSignUpInput,
          email: self.emailSignUpInput,
          password: self.confirmPassSignUpInput
        })
        .then(function (userCreated) {
          self.closeModal()
        })
        .catch(function (err) {
          console.log(err)
        })
      } else if (self.passwordSignUpInput !== self.confirmPassSignUpInput) {
        // TODO: Add password verification
      }
    },
    postQuestion: function () {
      var self = this
      axios.post('http://localhost:3000/forums/questions', {
        title: self.questionTitle,
        desc: self.questionDesc
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (createdPost) {
        self.closeModal()
        window.location.href = '/'
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    modalSignUpShow: function () {
      this.modalSignUp = 'modal is-active'
    },
    modalPostQuestionShow: function () {
      this.modalPostQuestion = 'modal is-active'
    },
    closeModal: function () {
      this.modalSignUp = 'modal'
      this.modalPostQuestion = 'modal'
    }
  },
  created: function () {
    // TODO: Add token check
  }
}
</script>

<style scoped lang="css">
  .button {
    margin-left: 5px;
    margin-right: 5px;
  }
  .input {
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .signup {
    width: auto;
  }
</style>

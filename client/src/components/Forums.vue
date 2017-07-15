<template lang="html">
  <div class="container">
    <div>
      <tr>
        <td>Title</td>
        <td>Author</td>
        <td>PosVote</td>
        <td>NegVote</td>
      </tr>
      <tr v-for='forum in forums'>
        <td>{{forum.title}}</td>
        <td>{{forum.User.username}}</td>
        <td><button class="button" type="button" name="posVoteBtn"> Like </button></td>
        <td><button class="button" type="button" name="negVoteBtn">Dislike</button>  </td>
      </tr>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      forums: null
    }
  },
  methods: {
    getForums: function () {
      var self = this
      axios.get('http://localhost:3000/forums/questions')
      .then(function (forums) {
        self.forums = forums.data
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getForums()
  }
}
</script>

<style lang="css">
</style>

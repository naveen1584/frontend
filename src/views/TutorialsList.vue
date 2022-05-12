<template>

    <h1>Tutorial List</h1>
    <h4>{{ message }}</h4>
  
      <v-row >
        <v-col col="2">
          <v-btn color = "success"
            @click="searchTitle"
          >
            Search
          </v-btn>
        </v-col>
        <v-col col="8">
            <v-text-field 
              v-model="title"/>
        </v-col>
           
      </v-row>
    <div>
    <v-table height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" width="30">
            Title
          </th>
          <th class="text-left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="(tutorial, index) in tutorials"
          :key="index"
        >
          <td >{{ tutorial.title }}</td>
          <td>{{ tutorial.description }}</td>
          <td>
            
              <v-btn  size="x-small" icon="mdi-pencil" @click="goEdit(tutorial)"/> 
          </td>
          <td>
              <v-btn  size="x-small" icon="mdi-trash-can"  @click="goDelete(tutorial)"/>
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
  </div>
  <v-btn  @click="removeAllTutorials">
    Remove All
  </v-btn>
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      message : "Click on a tutorial to edit"
    };
  },
  methods: {
    goEdit(tutorial) {
      this.$router.push({ name: 'edit', params: { id: tutorial.id } });
    },
    goDelete(tutorial) {
      TutorialDataService.delete(tutorial.id)
        .then(response => {
          this.tutorials = response.data;
          this.retrieveTutorials()
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },
    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
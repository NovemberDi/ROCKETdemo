<template>
  <v-app>
    <v-main>
      <v-data-table
      :headers="leadsHeaders"
      :items="leads"
      item-value="name"
      show-expand
      :loading="loading"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Пример тестового задания</v-toolbar-title>
            <v-text-field 
            v-model="querySearch" hide-details placeholder="Найти..." class="ma-2" density="compact"
            append-inner-icon="mdi-magnify"
            @input="search"
            >
            <v-icon v-show="alert" style="position: absolute; left: -30px;" color="warning" icon="mdi-alert"></v-icon>
          </v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:[`item.status_name`]="{ value, item }">
          <div  class="lead-status" :style="`background-color: ${item.status_color};`" >
            {{ value }}
          </div>
        </template>
        <template v-slot:[`item.created_at`]="{ value }">
          <div >
            {{ makeTime(value) }}
          </div>
        </template>
        <template v-slot:expanded-row="{ columns, item }">

          <tr v-for="contact in item.contacts" :key="contact.contact_name">
            <td :colspan="columns.length" >
              <v-avatar color="info" size="default">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>
              {{ contact.contact_name }} 
              <a class="tel link" :href="`tel:${contact.contact_phone}`">	&#9742;</a>
              <a class="mail link" :href="`mailto:${contact.contact_email}`">&#9993;</a>            
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import debounce from 'lodash.debounce'
import axios from 'axios'

interface State {
  leads: {
    id: number, 
    name: string,
    price: number,
    created_at: number,
    user: string,
    status_name: string,
    status_color: string,
    contacts: {
      contact_name: string,
      contact_phone: string,
      contact_email: string
    }[]
  }[],
  querySearch: string,
  leadsHeaders: object[],
  loading: boolean,
  alert: boolean,
  domen: string
  
}

export default defineComponent({
  name: 'App',

  data (): State {
    return {
      domen:'',
      querySearch:'',
      loading: false,
      alert: false,
        leadsHeaders: [
          { title: '', key: 'data-table-expand', sortable: false },
          { title: 'Название', sortable: false,key: 'name'},
          { title: 'Бюджет', key: 'price', sortable: false },
          { title: 'Статус', key: 'status_name', sortable: false },
          { title: 'Ответственный', key: 'user', sortable: false },
          { title: 'Дата создания', key: 'created_at', sortable: false },
          
        ],
        leads: []
    }
  
  },

  methods:{

    makeTime(value: number):string {
      let date: string = new Date(value).toLocaleDateString() + ' ' + new Date(value).toLocaleTimeString().slice(0,5)
      let resultDate = date
      return resultDate;
    },

    search(){
      if (this.alert) return
      this.getLeads()
    },
    async getLeads(){
      this.loading = true;
      try{
      let leads = await axios.get(
                `${this.domen}/api/leads`,
                {
                  params: {
                    query: this.querySearch, 
                  }
                }
              );
      this.leads = leads.data;       
    } catch(e){
      console.log(e)
    }
    this.loading = false    
     } 
    
  },
  watch:{
    querySearch(value:string){
      if (value.length < 4 && value.length != 0) {
        this.alert = true
      } else {
        this.alert = false
      }
    }
  },
  created() {
      this.search = debounce(this.search, 800);
      this.domen = window.location.origin;
  },
  mounted(){
    this.getLeads()
  }
  
})
</script>
<style scoped>
.link{
  font-size: 18px;
  line-height: 32px;
  text-decoration: none;
  color: #0859d4;
  margin-left: 12px;
}
.lead-status{
  border-radius: 6px;
  /* height: 100%; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
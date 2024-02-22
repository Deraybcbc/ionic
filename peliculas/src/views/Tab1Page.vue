<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>BUSCADOR DE PELICULAS</ion-title>
      </ion-toolbar>

      <ion-toolbar >
        <IonSearchbar placeholder="Nombre película" @ionInput="Pillarnombre"></IonSearchbar>

        <IonButtons slot="end" class="ion-margin-start">
          <IonButton shape="round" @click="BuscarBoton">Buscar</IonButton>
        </IonButtons>
      </ion-toolbar>

    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">

      <IonRow>
        <IonCol size="12" size-md="6" size-lg="3" v-for="pelicula in peli" :key="pelicula.imdbID">

          <IonCard class="cards">

            <img :src="pelicula.Poster" class="imagen" alt="Poster de la película" />

            <IonCardHeader>
              <IonCardTitle>{{ pelicula.Title }}</IonCardTitle>
              <IonCardSubtitle>{{ pelicula.Year }}</IonCardSubtitle>
              <IonButton shape="round" class="botonid" @click="BuscarID(pelicula.imdbID)">Ver Más</IonButton>
            </IonCardHeader>

            <IonCardContent v-if="MostrarMas && pelicula.imdbID === idBuscar">
              <ion-card-title class="text-h6">Descripción:</ion-card-title>
              {{ info.Plot }}

              <IonCardTitle class="text-h6">Valoraciones:</IonCardTitle>

              <p v-for="infor in info.Ratings">
                {{ infor.Source }}: {{ infor.Value }}
              </p>

              <IonButton shape="round" class="botonid"  @click="MostrarMas = false && idBuscar==0">Cerrar</IonButton>

            </IonCardContent>

          </IonCard>
        </IonCol>
      </IonRow>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButtons, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { buscar, buscarID } from '@/services/conexion'

// Definición de las propiedades reactivas
const reveal = ref(false);
const mostrar = ref(false);
const MostrarMas = ref(false);
const nombre = ref('');
const peli = ref<object[]>([]); // Anotación de tipo para peli
const info = ref<object>({});    // Anotación de tipo para info
const idBuscar = ref<number>(0); // Anotación de tipo para idBuscar

const Pillarnombre = (event: any) => {
  nombre.value = event.target.value;
};

// Definición de los métodos
const BuscarBoton = () => {
  const valorNombre = nombre.value;
  console.log("NOMBRE");
  console.log(valorNombre);
  buscar(valorNombre).then((response) => {
    peli.value = response;
    console.log(peli.value);
  });
  mostrar.value = true;
};

const BuscarID = (id: number) => {
  const idString = id.toString(); // Convertir el número a cadena
  console.log(idString);

  buscarID(idString).then((response) => {
    idBuscar.value = id;
    info.value = response;
    console.log(response);
  });
  idBuscar.value = 0;
  MostrarMas.value = true;
};

</script>


<style scoped>
.ion-margin-start {
  margin-left: 8px;
  /* Ajusta este valor según lo necesites */
  background-color: blue;
  border-radius: 50px;
  color: white;
}

.cards {
  max-height: auto;
  max-width: 300px;
  /* Cambia este valor según lo necesites */
}

.imagen {
  width: auto;
  height: 500px;
}


.botonid {
  width: 30%;
  background-color: blue;
  color: white;
  border-radius: 50px;
}
</style>

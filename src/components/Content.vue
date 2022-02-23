<template>
  <div v-for="image in images" :key="image.id">
    <router-link :to="{ name: 'ImageDetails', params: { id: image.id}}"> 
      <div class="responsive">
      <div class="gallery">
        <div class="desc"><h3>{{ image.title }}</h3></div>
          <img :src="image.imageUrl" width="800" height="450">    
          <div class="desc"> <p>by {{ image.userName }}</p>
          <p>{{ image.comments.length }} comments</p>
        </div>
      </div>
       </div>
    </router-link>
  </div>
</template>

<script>
export default {
    props:['images'],
}
</script>

<style scoped>
div.gallery {
  border: 1px solid #ccc;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

div.desc {
  padding: 15px;
  text-align: center;
}

* {
  box-sizing: border-box;
}

.responsive {
  padding: 0 6px;
  float: left;
  width: 24.99999%;
  margin-bottom: 20px;
}

@media only screen and (max-width: 700px) {
  .responsive {
    width: 49.99999%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 500px) {
  .responsive {
    width: 100%;
  }
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
  
</style>
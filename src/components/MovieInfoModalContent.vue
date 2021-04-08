<template>
  <div class="movie-info-wrap" v-if="movie">
    <header class="movie-info-header">
      <h6 class="movie-header-title">Movie view</h6>
    </header>
    <div class="movie-info-content">
      <div class="row">
        <div class="col-md-12 col-lg-4 mb-4">
          <div class="movie-poster-wrap">
            <div class="movie-poster" :style="newPosterStyle"></div>
          </div>
        </div>
        <div class="col-md-12 col-lg-8">
          <h3 class="movie-title">{{ movie.Title }}</h3>

          <el-rate class="movie-rate"
            v-model="numberRating"
            disabled
            show-score
            text-color="#ff9900"
            :max=max
            score-template="{value} / 10">
          </el-rate>
          <p class="movie-description">{{ movie.Plot }}</p>
          <div class="movie-tags mt-3 mb-2">
            <el-tag effect="dark" type="success" class="mr-2 mb-1">{{ movie.Year }}</el-tag>
            <el-tag effect="dark" type="success" class="mr-2 mb-1">{{ movie.Runtime }}</el-tag>
            <el-tag effect="dark" type="success" class="mr-2 mb-1">{{ movie.Language }}</el-tag>
            <el-tag effect="dark" type="success" class="mr-2 mb-1">{{ movie.Genre }}</el-tag>
          </div>
          <table class="table small">
            <tbody>
              <tr>
                <th>Production</th>
                <td>{{ movie.Production }}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{{ movie.Country }}</td>
              </tr>
              <tr>
                <th>Director</th>
                <td>{{ movie.Director }}</td>
              </tr>
              <tr>
                <th>Writer</th>
                <td>{{ movie.Writer }}</td>
              </tr>
              <tr>
                <th>Actors</th>
                <td>{{ movie.Actors }}</td>
              </tr>
              <tr>
                <th>Awards</th>
                <td>{{ movie.Awards }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const max = 10;
    const defaultPosterBg = 'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100% )';

    const posterStyle = computed(() => (props.movie ? `url(${props.movie.Poster})` : defaultPosterBg));

    const newPosterStyle = computed(() => ({
      'background-image': posterStyle.value,
    }));

    const numberRating = computed(() => Number(props.movie.imdbRating));

    return {
      newPosterStyle,
      numberRating,
      max,
    };
  },
};
</script>

<style scoped>
  .movie-info-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
    color: #fff;
  }
  .movie-header-title{
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem;
  }
  .movie-info-content{
    padding: 1rem;
    background-color: #fff;
    font-size: 1rem;
  }
  .movie-poster-wrap{
    position: relative;
    padding-bottom:  150%;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  .movie-poster{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }
  .movie-title{
    font-size: 2rem;
    /* font-weight: 300; */
  }
  .movie-description{
    font-size: 1.25rem;
    /* font-weight: 200; */
    text-align: justify;
    word-wrap: break-word;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }

  @media (max-width: 1000px) {
    .movie-rate{
      margin-bottom: 10px;
    }
    .movie-rate >>> .el-rate__item .el-rate__icon,
    .movie-rate >>> .el-rate__text{
      font-size: 12px;
    }
    .movie-title{
      font-size: 1.5rem;
    }
    .movie-description{
      font-size: 1rem;
    }
    .movie-tags >>> .el-tag{
      font-size: 0.6rem;
    }
  }
  /* .movie-info-content .movie-description {
    text-align: justify;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  } */
  .close-icon{
    font-size:24px;
    cursor: pointer;
  }

  th{
    width: 95px;
  }

  td, th {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  td{
    text-align: justify;
    word-wrap: break-word;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }
</style>

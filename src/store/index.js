import { createStore } from 'vuex';
import movies from './modules/movies';
import loader from './modules/loader';
import notification from './modules/notification';

const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies,
    loader, // Он глобальный так как не указали namespaced и
    // его в принципе не обязательно указывать с всписке модулей
    notification,
  },
});

// Используем root элемент movies store, делается это для того, чтобы
// инициализировать данные, раньше чем произойдет инициализация компонентов.
// Так как иницаилизация сторы, происходит раньше чем инициализация компонентов.
store.dispatch('initMovieStore');

export default store;

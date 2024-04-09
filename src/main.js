'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import pixabay from './js/pixabay-api';
import renderData from './js/render-functions';

{
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const loader = document.getElementById('loader');
  // loader.style.display = 'none';

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const searchTerm = input.value.trim();

    if (searchTerm === '') {
      let message = 'Please enter a search term.';
      iziToast.error({
        title: 'Error:',
        message: message,
        position: 'topRight',
      });
      return;
    }

    //loaderShow();
    loader.style.display = 'block';

    await setTimeout(async () => {
      try {
        let response = await pixabay(searchTerm);
        console.log('m:data', response);
        const data = response.hits;
        console.log('m:hits:', data);

        if (data.length === 0) {
          renderData(data);
          iziToast.error({
            message: `main: Sorry, there are no images matching your search query: [${searchTerm}]. Please try again!`,
          });
          return;
        }

        renderData(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        iziToast.error({
          title: 'Error:',
          message:
            'An error occurred while fetching images. Please try again later.',
        });
      } finally {
        // loaderHide();
        loader.style.display = 'none';
        form.reset(); //clear form
      }
    }, 3333);
    //input.value = '';//clear input;
    return;
  });

  // function loaderShow() {
  //   console.log('loaderShow()');
  //   loader.style.display = 'block';
  // }
  // function loaderHide() {
  //   console.log('loaderHide()');
  //   loader.style.display = 'none';
  // }

  // // Прослуховування подій перед відправленням запиту на бекенд
  // document.addEventListener('beforeBackendRequest', loaderShow);
  // // Прослуховування подій після отримання відповіді від бекенду
  // document.addEventListener('afterBackendResponse', loaderHide);

  // document.addEventListener('DOMContentLoaded', function () {
  //   const loader = document.getElementById('loader');

  //   // Функція для показу індикатора завантаження
  //   function showLoader() {
  //     console.log('loaderShow(2)');
  //     loader.style.display = 'block';
  //   }

  //   // Функція для приховування індикатора завантаження
  //   function hideLoader() {
  //     console.log('loaderHide(2)');
  //     loader.style.display = 'none';
  //   }

  //   // Прослуховування подій перед відправленням запиту на бекенд
  //   document.addEventListener('beforeBackendRequest', showLoader);

  //   // Прослуховування подій після отримання відповіді від бекенду
  //   document.addEventListener('afterBackendResponse', hideLoader);
  // });
}

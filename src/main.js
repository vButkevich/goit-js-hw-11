'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

{
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const searchValue = input.value.trim();

    if (searchValue === '') {
      let message = 'Please enter a search term.';
      iziToast.error({
        // title: 'Error',
        message: message,
        position: 'topRight',
        // timeout: 2000,
      });
      return;
    }

    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          // key: 'YOUR_API_KEY',
          key: '42700764-e859e8fc9280be2dbaa9956c4',
          q: searchValue,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
        },
      });
      console.log(response);
      const images = response.data.hits;

      if (images.length === 0) {
        iziToast.warning({
          title: 'Warning',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      gallery.innerHTML = ''; // Clear previous search results

      images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.previewURL;
        imgElement.alt = image.tags;
        gallery.appendChild(imgElement);
      });
    } catch (error) {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message:
          'An error occurred while fetching images. Please try again later.',
      });
    }
  });
}

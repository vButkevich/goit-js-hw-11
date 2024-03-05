// 'use strict';

// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// // import SimpleLightbox from 'simplelightbox';
// // import 'simplelightbox/dist/simple-lightbox.min.css';
{
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  const loader = document.getElementById('loader');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const searchTerm = input.value.trim();

    if (!searchTerm) {
      let message = 'Please enter a search term.';
      iziToast.error({
        // title: 'Error',
        message: message,
        position: 'topRight',
        // timeout: 2000,
      });
      return;
    }

    loader.style.display = 'block';
    gallery.innerHTML = '';

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=42700764-e859e8fc9280be2dbaa9956c4&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`
      );
      const data = await response.json();

      if (data.hits.length === 0) {
        // throw new Error('No images found');
        iziToast.warning({
          title: 'Warning',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      data.hits.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;

        card.appendChild(img);
        gallery.appendChild(card);
      });
    } catch (error) {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } finally {
      loader.style.display = 'none';
    }
  });
}
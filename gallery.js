const gallery = document.getElementById('gallery');
const uploadInput = document.getElementById('uploadInput');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// قراءة الصور المخزنة في localStorage أو تعيين مصفوفة فارغة إذا لم توجد
const imageData = JSON.parse(localStorage.getItem('imageData')) || [];

// إنشاء المربعات
for (let i = 0; i < 75; i++) {
  const square = document.createElement('div');
  square.className = 'square';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';

  const buttons = document.createElement('div');
  buttons.className = 'buttons';

  const addBtn = document.createElement('button');
  addBtn.className = 'add-btn';
  addBtn.textContent = 'إضافة صورة';
  addBtn.onclick = () => handleAddImage(square, i); // نمرر الفهرس i هنا

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'download-btn';
  downloadBtn.textContent = 'تحميل';

  downloadBtn.onclick = () => {
    const img = square.querySelector('img');
    if (img) {
      const a = document.createElement('a');
      a.href = img.src;
      a.download = img.alt || 'image';
      a.click();
    }
  };

  // إنشاء زر الحذف
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'حذف';
  
  // إضافة وظيفة لحذف الصورة
  deleteBtn.onclick = () => {
    const img = square.querySelector('img');
    if (img) {
      img.remove();  // حذف الصورة من المربع
      // حذف الصورة من الـ localStorage أيضًا
      const index = imageData.findIndex(image => image.img === img.src);
      if (index !== -1) {
        imageData.splice(index, 1); // إزالة العنصر من المصفوفة
        localStorage.setItem('imageData', JSON.stringify(imageData)); // حفظ التغييرات
      }
    }
  };

  buttons.appendChild(downloadBtn);
  buttons.appendChild(addBtn);
  buttons.appendChild(deleteBtn); // إضافة زر الحذف
  square.appendChild(imageContainer);
  square.appendChild(buttons);
  gallery.appendChild(square);
}

// ✅ عرض الصور المحفوظة عند تحميل الصفحة (تعديل هنا فقط)
function displayImages() {
  imageData.forEach(({ name, img, index }) => {
    const square = gallery.children[index];
    if (!square) return;

    const imageContainer = square.querySelector('.image-container');

    const newImg = document.createElement('img');
    newImg.src = img;
    newImg.alt = name;

    imageContainer.appendChild(newImg);
  });
}

// عرض الصور عند تحميل الصفحة
displayImages();

// تعديل دالة handleAddImage
function handleAddImage(square, index) {
  uploadInput.onchange = () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const name = prompt("سَمِّ هذه الصورة:");
    if (!name) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      img.alt = name;

      const container = square.querySelector('.image-container');
      container.appendChild(img);

      // إضافة الصورة إلى المصفوفة مع index
      imageData.push({ name, img: reader.result, index });

      // حفظ البيانات في localStorage
      localStorage.setItem('imageData', JSON.stringify(imageData));
    };
    reader.readAsDataURL(file);
  };
  uploadInput.click();
}

// البحث عن الصور بناءً على الاسم
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.trim().toLowerCase();
  let found = false;

  imageData.forEach(({ name, img }) => {
    const match = name.toLowerCase().includes(keyword);
    const imgElement = gallery.querySelector(`img[src="${img}"]`);
    if (imgElement) {
      imgElement.style.display = match || keyword === '' ? 'block' : 'none';
      if (match) found = true;
    }
  });

  noResults.style.display = (!found && keyword !== '') ? 'block' : 'none';
});

function openNav() {
  document.getElementById("leftNav").style.width = "250px"; /* فتح الشريط الجانبي */
}

function closeNav() {
  document.getElementById("leftNav").style.width = "0"; /* إغلاق الشريط الجانبي */
}


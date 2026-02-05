const gallery = document.querySelector(".gallery")
const galleryImgList = document.querySelectorAll(".gallery-item")

// const defaultOptions = {
//     columns: 3,
//     lightBox: true,
//     lightboxId: null,
//     showTags: true,
//     tagsPosition: "bottom",
//     navigation: true
//   };

const options = {
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top',
        navigation: true
    }
        
function main(){
  gallery.setAttribute("style", "display:block;")
  var tagsCollection = [];
  createRowWrapper(gallery)
  if (options.lightBox) {
    createLightBox(
      gallery,
      options.lightboxId,
      options.navigation
    );

  }

  galleryImgList.forEach(img => {
    responsiveImageItem(img);
    //moveItemInRowWrapper(img);
    wrapItemInColumn(img, options.columns)
    var theTag = gallery.dataset.galleryTag
    if (
      options.showTags &&
      theTag !== undefined &&
      tagsCollection.indexOf(theTag) === -1
    ) {
      tagsCollection.push(theTag);
    }
    img.addEventListener("click", img => {
      if(options.lightBox && img.target.tagName === "IMG") {
        openLightBox(img.target, options.lightboxId)
      } else {
        return
      }
    })
  })
  if (options.showTags) {
    // showItemTags(
    //   gallery,
    //   options.tagsPosition,
    //   tagsCollection
    // );
  }

}
  // gallery.querySelector(".mg-prev").addEventListener("click", () => {
  //   prevImage(options.lightboxId)
  // })
  // gallery.querySelector(".mg-next").addEventListener("click", () => {
  //   nextImage(options.lightboxId)
  // })


function createRowWrapper(gallery){
    if(!gallery.firstElementChild.classList.contains("row"))
    {
        //gallery.appendChild('<div class="gallery-items-row row"></div>');
        gallery.insertAdjacentHTML( 'beforeend', '<div class="gallery-items-row row"></div>' );

    }
}

function wrapItemInColumn(img, columns){
  const container = document.createElement("div")
    if (columns.constructor === Number) {
      container.setAttribute("class", `item-column mb-4 col-${Math.ceil(12 / columns)}`)
      gallery.querySelector(".gallery-items-row").appendChild(container);
      container.appendChild(img)
        // img.wrap(
        //   `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
        // );
    } else if (columns.constructor === Object) {
      var columnClasses = "";
      if (columns.xs) {
        columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
      }
      if (columns.sm) {
        columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
      }
      if (columns.md) {
        columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
      }
      if (columns.lg) {
        columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
      }
      if (columns.xl) {
        columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
      }
      container.setAttribute("class", `item-column mb-4${columnClasses}`)
      gallery.querySelector(".gallery-items-row").appendChild(container );
      container.appendChild(img)
    } else {
      console.error(
        `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
      );
    }
}
function moveItemInRowWrapper(img){
    document.querySelector(".gallery-items-row").appendChild(img)
}
function responsiveImageItem(img){
        img.classList.add("img-fluid");
}
function toggleModal(lightboxId){
  const body = document.getElementsByTagName("body")[0]
  const modal = document.getElementById(lightboxId)
  body.classList.add("modal-open")
  body.setAttribute("style", "overflow: hidden; padding-right: 15px;")
  modal.classList.add("show")
  modal.setAttribute("style", "display: block;")
  modal.setAttribute("role", "dialog")
}
function openLightBox(element, lightboxId) {
   document.getElementById(lightboxId).querySelector(".lightboxImage").setAttribute("src",element.src)
  // toggleModal(lightboxId)
  var modal = new bootstrap.Modal(document.getElementById(lightboxId))
modal.toggle()
  //document.getElementById(lightboxId).modal("toggle")
   // $(`#${lightboxId}`).modal("toggle");
}
function prevImage() {
   let activeImage = null;
   const galleryItems = document.querySelectorAll("img.gallery-item")
   const lightboxImage = document.querySelector(".lightboxImage")
   galleryItems.forEach(item => {
    if(item.src === lightboxImage.src)
    {
      activeImage = item
    }
   })
      
   let activeTag = document.querySelector(".tags-bar span.active-tag").dataset.imagesToggle
   let imagesCollection = [];
   const itemColumns = document.querySelectorAll(".item-column")
   if (activeTag === "all") {
   itemColumns.forEach(item => {
    if(item.getElementsByTagName("img").length)
    {
      imagesCollection.push(item.firstChild)
    }
    })
  } else {
      itemColumns.forEach(item => {
        if(item.querySelector(".gallery-item").dataset.galleryTag === activeTag)
        {
          imagesCollection.push(item.firstChild)
        }
      })
    }
    //  $(".item-column").each(function() {
    //    if ($(this).children("img").length) {
    //      imagesCollection.push($(this).children("img"));
    //    }
    //  });
  //  } else {
  //    $(".item-column").each(function() {
  //      if (
  //        $(this)
  //          .children("img")
  //          .data("gallery-tag") === activeTag
  //      ) {
  //        imagesCollection.push($(this).children("img"));
  //      }
  //    });
  //  }
   let index = 0,
     next = null;
  imagesCollection.forEach((image,i) => {
    if(activeImage.getAttribute("src") === image.getAttribute("src"))
    {
      index = i
    }
  })
  //  $(imagesCollection).each(function(i) {
  //    if ($(activeImage).attr("src") === $(this).attr("src")) {
  //      index = i ;
  //    }
  //  });

   next =
     imagesCollection[index-1] ||
     imagesCollection[imagesCollection.length - 1];
     document.querySelector(".lightboxImage").setAttribute("src", next.getAttribute("src"))
  //  $(".lightboxImage").attr("src", $(next).attr("src"));
}
 function nextImage() {
   let activeImage = null;
   const galleryItems = document.querySelectorAll("img.gallery-item")
   const lightboxImage = document.querySelector(".lightboxImage")
   galleryItems.forEach(item => {
    if(item.src === lightboxImage.src)
    {
      activeImage = item
    }
   })
   let activeTag = gallery.querySelector(".tags-bar span.active-tag").dataset.imagesToggle
   let imagesCollection = [];
   const itemColumns = document.querySelectorAll(".item-column")
   if (activeTag === "all") {
   itemColumns.forEach(item => {
    if(item.getElementsByTagName("img").length)
    {
      imagesCollection.push(item.firstChild)
    }
    })
  } else {
      itemColumns.forEach(item => {
        if(item.querySelector(".gallery-item").dataset.galleryTag === activeTag)
        {
          imagesCollection.push(item.firstChild)
        }
      })
    }
    
   let index = 0,
     next = null;
  imagesCollection.forEach((image,i) => {
    if(activeImage.getAttribute("src") === image.getAttribute("src"))
    {
      index = i
    }
  })
   next = imagesCollection[index+1] || imagesCollection[0];
   document.querySelector(".lightboxImage").setAttribute("src", next.getAttribute("src"))
   //$(".lightboxImage").attr("src", $(next).attr("src"));
 }


function createLightBox(gallery, lightboxId, navigation) {
  gallery.insertAdjacentHTML("afterbegin" , `<div class="modal fade" id="${
    lightboxId ? lightboxId : "galleryLightbox"
  }" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        ${
                          navigation
                            ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                            : '<span style="display:none;" />'
                        }
                        <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                        ${
                          navigation
                            ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                            : '<span style="display:none;" />'
                        }
                    </div>
                </div>
            </div>
        </div>`);
  document.querySelector(".mg-prev").addEventListener("click" , () => {
    prevImage(options.lightboxId)
  })
  document.querySelector(".mg-next").addEventListener("click" , () => {
    nextImage(options.lightboxId)
  })
}

// function showItemTags(gallery, position, tags) {
//   var tagItems =
//     '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
//   $.each(tags, function(index, value) {
//     tagItems += `<li class="nav-item active">
//             <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
//   });
//   var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;
//   if (position === "bottom") {
//     gallery.append(tagsRow);
//   } else if (position === "top") {
//     gallery.prepend(tagsRow);
//   } else {
//     console.error(`Unknown tags position: ${position}`);
//   }
// }

function generateFilters(){
    let tagList = []
    galleryImgList.forEach((img) => {
        if(!tagList.includes(img.dataset.galleryTag))
        {
            tagList.push(img.dataset.galleryTag)
        }
    })
    //let tagItems = []
    let tagItems = '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>'
    tagList.forEach(tag => {
        tagItems += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${tag}">${tag}</span></li>`
    })
    // let tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;
    let tagsRow = document.createElement('ul');
    tagsRow.setAttribute('class', 'my-4 tags-bar nav nav-pills')
    tagsRow.innerHTML = tagItems;
    gallery.prepend(tagsRow);
    gallery.querySelectorAll(".nav-link").forEach(tag => tag.addEventListener("click", (tag) => {
    filterByTag(tag.target)}))
}

function filterByTag(clickedFilter) {
  if (clickedFilter.classList.contains("active-tag")) {
    return;
  }
  gallery.querySelector(".active-tag").classList.remove("active");
  gallery.querySelector(".active-tag").classList.remove("active-tag");
  clickedFilter.classList.add("active-tag");
  clickedFilter.classList.add("active");
  var tag = clickedFilter.dataset.imagesToggle;

  galleryImgList.forEach(img => {
    if (tag === "all") {
      img.parentNode.hidden = false;
    } else if (img.dataset.galleryTag === tag) {
      img.parentNode.hidden = false;
    } else{
        img.parentNode.hidden = true;
    }
  });
}
main()
generateFilters()

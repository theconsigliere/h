let addToCartFormSelector="#add-to-cart-form",productOptionSelector=addToCartFormSelector+" [name*=option]",productForm={onProductOptionChanged:function(t){let n=$(this).closest(addToCartFormSelector),e=productForm.getActiveVariant(n);n.trigger("form:change",[e])},getActiveVariant:function(t){let n=JSON.parse(decodeURIComponent(t.attr("data-variants"))),e=t.serializeArray(),i={option1:null,option2:null,option3:null},a=null;return $.each(e,(function(t,n){-1!==n.name.indexOf("option")&&(i[n.name]=n.value)})),$.each(n,(function(t,n){if(n.option1===i.option1&&n.option2===i.option2&&n.option3===i.option3)return a=n,!1})),a},validate:function(t,n){let e,i,a=$(this),o=null!==n,r=o&&n.inventory_quantity>0,c=a.find(".js-variant-id"),l=a.find("#add-to-cart-button"),s=a.find(".js-price");$emailButton=a.find("#mhaRnProduct"),o?(e="$"+(n.price/100).toFixed(2),i='<span class="money">'+e+"</span>",window.history.replaceState(null,null,"?variant="+n.id)):i=s.attr("data-default-price"),r?(c.val(n.id),l.prop("disabled",!1),$emailButton.css("display","none")):(c.val(""),l.prop("disabled",!0),$emailButton.css("display","block")),s.html(i),currencyPicker.onMoneySpanAdded()},init:function(){$(document).on("change",productOptionSelector,productForm.onProductOptionChanged),$(document).on("form:change",addToCartFormSelector,productForm.validate)}};productForm.init();let miniCartContentsSelector=".js-mini-cart-contents",ajaxify={onAddToCart:function(t){t.preventDefault(),$.ajax({type:"POST",url:"/cart/add.js",data:$(this).serialize(),dataType:"json",success:ajaxify.onCartUpdated,error:ajaxify.onError})},onCartUpdated:function(){$(miniCartContentsSelector+" .js-cart-fieldset").prop("disabled",!0),$.ajax({type:"GET",url:"/cart",context:document.body,success:function(t){let n=$(t).find(".js-cart-page-contents"),e=n.html(),i=n.attr("data-cart-item-count"),a=$(miniCartContentsSelector);$(".js-cart-item-count").text(i),a.html(e),currencyPicker.onMoneySpanAdded(),parseInt(i)>0?ajaxify.openCart():ajaxify.closeCart()}})},onError:function(t,n){let e=t.responseJSON;alert(e.status+" - "+e.message+": "+e.description)},onCartButtonClick:function(t){let n=$("html").hasClass("mini-cart-open");-1!==window.location.href.indexOf("/cart")||(t.preventDefault(),n?ajaxify.closeCart():ajaxify.openCart())},ifMegaMenu:function(){$(".mega-menu-full").is(":visible")&&ajaxify.closeCart()},openCart:function(){$(".crosselling-section").addClass("js-crosselling-open"),$("html").addClass("mini-cart-open")},closeCart:function(){$("html").removeClass("mini-cart-open")},init:function(){$(document).on("submit",addToCartFormSelector,ajaxify.onAddToCart),$(".nav_item").on("mouseover",ajaxify.ifMegaMenu),$(document).on("click",".js-cart-link, .js-keep-shopping",ajaxify.onCartButtonClick)}};ajaxify.init();let quantityFieldSelector=".js-quantity-field",quantityButtonSelector=".js-quantity-button",quantityPickerSelector=".js-quantity-picker",quantityPicker={onButtonClick:function(t){let n=$(this),e=n.closest(quantityPickerSelector).find(".js-quantity-field"),i=parseInt(e.val()),a=e.attr("max")?parseInt(e.attr("max")):null;n.hasClass("plus")&&(null===a||i+1<=a)?e.val(i+1).change():n.hasClass("minus")&&e.val(i-1).change()},onChange:function(t){let n=$(this),e=n.closest(quantityPickerSelector),i=e.find(".js-quantity-text"),a=parseInt(this.value)===parseInt(n.attr("min")),o=parseInt(this.value)===parseInt(n.attr("max")),r=e.find(".js-quantity-button.minus"),c=e.find(".js-quantity-button.plus");i.text(this.value),a?r.prop("disabled",!0):!0===r.prop("disabled")&&r.prop("disabled",!1),o?c.prop("disabled",!0):!0===c.prop("disabled")&&c.prop("disabled",!1)},init:function(){$(document).on("click",quantityButtonSelector,quantityPicker.onButtonClick),$(document).on("change",quantityFieldSelector,quantityPicker.onChange)}};quantityPicker.init();let removeLineSelector=".js-remove-line",lineQuantitySelector=".js-line-quantity",lineItem={isInMiniCart:function(t){return 0!==$(t).closest(miniCartContentsSelector).length},onLineQuantityChanged:function(t){let n={quantity:this.value,id:$(this).attr("id").replace("updates_","")};lineItem.isInMiniCart(this)&&$.post("/cart/change.js",n,ajaxify.onCartUpdated,"json")},onLineRemoved:function(t){if(lineItem.isInMiniCart(this)){t.preventDefault();let n=$(this).attr("href").split("change?")[1];$.post("/cart/change.js",n,ajaxify.onCartUpdated,"json")}},init:function(){$(document).on("click",removeLineSelector,lineItem.onLineRemoved),$(document).on("change",lineQuantitySelector,lineItem.onLineQuantityChanged)}};lineItem.init();
$(document).ready(function () {
    let currentActive = null;

    $("nav ul li a").click(function (e) {
        e.preventDefault();

        // Gỡ trạng thái cũ
        if (currentActive) {
            $(currentActive.link).removeClass("activelink");
            $(currentActive.content).removeClass("activecontent");
        }

        // Lấy id của thẻ a
        const linkId = $(this).attr("id");
        // Chuyển thành id nội dung
        const contentId = "#nd" + linkId;

        // Thêm class
        $(this).addClass("activelink");
        $(contentId).addClass("activecontent");

        // Ghi nhớ
        currentActive = {
            link: this,
            content: contentId
        };
    });

    // Khi click ra ngoài
    $(document).click(function (e) {
        if (
            currentActive &&
            !$(e.target).is(currentActive.link) &&
            !$(e.target).closest(currentActive.content).length
        ) {
            $(currentActive.link).removeClass("activelink");
            $(currentActive.content).removeClass("activecontent");
            currentActive = null;
        }
    });
});

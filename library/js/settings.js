jQuery(document).ready(function() {
    var social = (function() {
        function social(settings) {
            this.social = settings.social;
            this.Init();
        };

        social.prototype.Init = function() {
            var html = "";

            $.each(this.social, function(i, e) {
                if (e) {
                    html += "<div class='"+i+"'>";
                    html += "<span class='"+i+" icon-"+i+"'></span>";
                    html += e;
                    html += "</div>";
                }
            });

            $(".social").html(html);
        }

        return social;
    }());

    social = new social(settings);
});


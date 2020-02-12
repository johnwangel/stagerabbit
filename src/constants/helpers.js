export const getPosition = () => {
    var body = document.body,
        html = document.documentElement,
        height = Math.max(  body.scrollHeight,
                            body.offsetHeight,
                            html.clientHeight,
                            html.scrollHeight,
                            html.offsetHeight
                          ),
        scroll = (window.outerWidth > 800 )
          ? 25+window.scrollY
          : 35+window.scrollY;
  return { scroll, height };
};
export const scrollToBottom = (id) => {
        var simpleBar = document
            .getElementById(id)
            .querySelector("#chat-conversation .simplebar-content-wrapper");
        var offsetHeight = document.getElementsByClassName(
            "chat-conversation-list"
        )[0]
            ? document
                  .getElementById(id)
                  .getElementsByClassName("chat-conversation-list")[0]
                  .scrollHeight -
              window.innerHeight +
              250
            : 0;
        if (offsetHeight)
            simpleBar.scrollTo({ top: offsetHeight, behavior: "smooth" });
}
module.exports = (io, socket) => {

  // ✅ JOIN COMMUNITY ROOM
  socket.on("join-community", ({ code, user }) => {
    socket.join(code);

    console.log(`${user.name} joined ${code}`);

    io.to(code).emit("member-joined", {
      user,
    });
  });

  // ✅ LIVE STEP UPDATE
  socket.on(
    "send-steps",
    async (data) => {

      io.to(data.code).emit(
        "steps-updated",
        data
      );
    }
  );
};
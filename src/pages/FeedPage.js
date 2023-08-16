import { useProtectedPage } from "../hooks/useProtecdPage";

function FeedPage() {

  useProtectedPage()

  return (
    <main>
      <h1>Página de Feed</h1>
    </main>
  );
}

export default FeedPage;
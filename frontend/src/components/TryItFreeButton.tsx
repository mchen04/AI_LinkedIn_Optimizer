import { useNavigate } from '@tanstack/react-router';

export function TryItFreeButton() {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate({ to: '/login' })}
      className="btn-primary"
    >
      Try It Free
    </button>
  );
}

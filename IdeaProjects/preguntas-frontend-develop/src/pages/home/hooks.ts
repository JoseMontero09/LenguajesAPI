import { useApiHandler } from '../../hooks/useApiHandlers';

export const useDependencies = () => {
  const { handleQuery } = useApiHandler();

  const getAllEvents = async () => {
    const { result, isError, message } = await handleQuery( undefined);

    if (isError) {
      console.log(message); // Aquí podrías integrar notificaciones o alertas si es necesario
    }

    return Array.isArray(result) ? result : [];
  };

  return { getAllEvents };
};

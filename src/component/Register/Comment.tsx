import { CommentIcon } from '..';
import { ptBR } from '../../languages';
import { Register } from '../../models';
import { MultiActionButtonWrapper } from './MultiActionButtonWrapper';

interface CommentProps {
  register: Register;
}

export default function Comment({ register }: CommentProps) {
  return (
    <MultiActionButtonWrapper
      containerClassName="max-w-[theme(spacing.40)] max-h-[theme(spacing.60)]"
      disabled={!register.comments}
      label={ptBR.comment}
      icon={
        <CommentIcon
          className="w-6 stroke-0"
          viewBox="0 0.5 24 24"
        />
      }>
      {register.comments}
    </MultiActionButtonWrapper>
  );
}

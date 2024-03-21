import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { MappedCoachValues, MappedFitnessValues } from "src/utils";
import { modifyCoachFormValidationSchema, modifyFitnessFormValidationSchema } from "src/validations";
import { useTranslation } from "react-i18next";
import { ModifyCoachFormProviderProps, ModifyFitnessFormProviderProps } from "src/forms";
import { usePopUpContext, useServerdataLazy, useUserContext } from "src/hooks";
import { AddFitnessBody, Fitness, UpdateFitnessBody, addFitness, postImage, updateFitness } from "src/fetcher";
import { coachMapper, fitnessMapper } from "src/mappers";

export const ModifyCoachFormProvider: FC<ModifyCoachFormProviderProps> = (props) => {
  const { children, defaultValues } = props;
  const { t } = useTranslation()
  const { userObject } = useUserContext()
  const methods = useForm<MappedCoachValues>({
    defaultValues: { ...coachMapper.apiToForm(defaultValues) },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: modifyCoachFormValidationSchema(t)
  });
  const { handleSubmit, watch } = methods;
  const val = watch()
  console.log({ val })


  const submit = (data: MappedCoachValues) => {
    console.log(data)

  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export const ModifyFitnessFormProvider: FC<ModifyFitnessFormProviderProps> = (props) => {
  const { children, defaultValues, newRecord } = props;
  const { userId } = useUserContext()
  const { success, error } = usePopUpContext()
  const { fetchCall: addFitnessCall, loading: addFitnessLoading } = useServerdataLazy(addFitness)
  const { fetchCall: updateFitnessCall, loading: updateFitnessLoading } = useServerdataLazy(updateFitness)
  const { fetchCall: uploadImages, loading: iploadImagesLoading } = useServerdataLazy(postImage)

  const { t } = useTranslation()

  const methods = useForm<MappedFitnessValues>({
    defaultValues: { ...fitnessMapper.apiToForm(defaultValues) },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: modifyFitnessFormValidationSchema(t)
  });
  const { watch, handleSubmit, formState: { errors } } = methods;
  const values = watch()
  //console.log(values.dataProcessingForPropagation)
  //console.log(errors)

  const submit = async (data: MappedFitnessValues) => {
    const { mainPicture: main, cardPicture: card, othersPictures: others, ...restData } = data
    const pictureIds = await uploadImages({ main, card, others })

    if (!userId) {
      error({ header: t("common.error"), text: t("modifyPage.popUp.errorUserIdText") })
      return
    }

    if (pictureIds?.card && pictureIds.detail.main && userId) {
      const mapToApi = fitnessMapper.formToApi({ ...restData, owner: userId, pictures: pictureIds as Fitness["pictures"] })
      if (newRecord) {
        const addFitnessRepsonse = await addFitnessCall(mapToApi as AddFitnessBody)
        addFitnessRepsonse?.data && success({ header: t("common.success"), text: t("modifyPage.popUp.successTextFitness") })
        return
      } else {
        const updateFitnessResponse = await updateFitnessCall(mapToApi as UpdateFitnessBody)
        console.log(updateFitnessResponse)
        return
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};
